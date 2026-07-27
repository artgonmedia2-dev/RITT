import { NextRequest, NextResponse } from 'next/server'
import { trackingDatabase } from '@/lib/data'

const MSC_BASE = 'https://portal.api.msc.com/dpo/trackandtrace/v2.2'

// ─── DCSA types ───────────────────────────────────────────────────────────────

interface DcsaEvent {
  eventType: 'TRANSPORT' | 'EQUIPMENT' | 'SHIPMENT'
  eventDateTime: string
  eventClassifierCode: 'ACT' | 'EST' | 'PLN'
  description?: string
  transportEventTypeCode?: 'ARRI' | 'DEPA'
  equipmentEventTypeCode?: 'LOAD' | 'DISC' | 'GTIN' | 'GTOT' | 'STRP' | 'STUF'
  equipmentReference?: string
  transportCall?: {
    unLocationCode?: string
    vessel?: { vesselName?: string }
  }
  eventLocation?: { locationName?: string; unLocationCode?: string }
  documentReferences?: Array<{
    documentReferenceType: string
    documentReferenceValue: string
  }>
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const TRANSPORT_LABELS: Record<string, string> = {
  ARRI: 'Arrivée navire au port',
  DEPA: 'Départ navire du port',
}

const EQUIPMENT_LABELS: Record<string, string> = {
  LOAD: 'Chargement conteneur sur navire',
  DISC: 'Déchargement conteneur du navire',
  GTIN: 'Réception au terminal export',
  GTOT: 'Remise au destinataire / Sortie terminal',
  STRP: 'Dépotage conteneur',
  STUF: 'Empotage conteneur',
}

function getLabel(event: DcsaEvent): string {
  if (event.description) return event.description
  if (event.eventType === 'TRANSPORT' && event.transportEventTypeCode) {
    return TRANSPORT_LABELS[event.transportEventTypeCode] ?? event.transportEventTypeCode
  }
  if (event.eventType === 'EQUIPMENT' && event.equipmentEventTypeCode) {
    return EQUIPMENT_LABELS[event.equipmentEventTypeCode] ?? event.equipmentEventTypeCode
  }
  return 'Événement'
}

function getLocation(event: DcsaEvent): string {
  return event.eventLocation?.locationName ?? event.transportCall?.unLocationCode ?? ''
}

// Detect which MSC query parameter to use based on the reference format
function detectRefParam(ref: string): { param: string; value: string } {
  const clean = ref.trim().toUpperCase()
  // BIC container code: 4 uppercase letters + 7 digits (ISO 6346)
  if (/^[A-Z]{4}\d{7}$/.test(clean)) {
    return { param: 'equipmentReference', value: clean }
  }
  // Pure numeric → carrier booking reference
  if (/^\d{6,}$/.test(clean)) {
    return { param: 'carrierBookingReference', value: clean }
  }
  // Default: Bill of Lading / Transport Document Reference
  return { param: 'transportDocumentReference', value: clean }
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
    })
  } catch {
    return iso
  }
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id')?.trim()
  if (!id) {
    return NextResponse.json({ error: 'Paramètre manquant' }, { status: 400 })
  }

  const upper = id.toUpperCase()

  // 1. RITT internal demo references (RITT-XXXX-XXXXXX)
  if (upper in trackingDatabase) {
    return NextResponse.json(trackingDatabase[upper])
  }

  // 2. Real MSC DCSA Track & Trace API
  const apiKey = process.env.MSC_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'api_key_missing' }, { status: 503 })
  }

  try {
    const { param, value } = detectRefParam(upper)
    const url = `${MSC_BASE}/events?${param}=${encodeURIComponent(value)}`

    const mscRes = await fetch(url, {
      headers: {
        'Ocp-Apim-Subscription-Key': apiKey,
        Accept: 'application/json',
      },
      next: { revalidate: 120 }, // 2-minute edge cache on Vercel
    })

    if (mscRes.status === 404) {
      return NextResponse.json({ error: 'not_found' }, { status: 404 })
    }
    if (!mscRes.ok) {
      return NextResponse.json({ error: `MSC API error ${mscRes.status}` }, { status: 502 })
    }

    const events: DcsaEvent[] = await mscRes.json()
    if (!events?.length) {
      return NextResponse.json({ error: 'not_found' }, { status: 404 })
    }

    // Sort chronologically
    const sorted = [...events].sort(
      (a, b) =>
        new Date(a.eventDateTime).getTime() - new Date(b.eventDateTime).getTime()
    )

    // Use eventClassifierCode (ACT = confirmed, EST/PLN = future) — not date comparison
    let lastActualIdx = -1
    sorted.forEach((e, i) => {
      if (e.eventClassifierCode === 'ACT') lastActualIdx = i
    })

    const timeline = sorted.map((event, i) => {
      let status: 'completed' | 'current' | 'pending'
      if (event.eventClassifierCode === 'ACT') {
        status = i === lastActualIdx ? 'current' : 'completed'
      } else {
        status = 'pending'
      }

      const vessel = event.transportCall?.vessel?.vesselName
      const loc = getLocation(event)

      return {
        date: formatDate(event.eventDateTime),
        status,
        label: getLabel(event),
        location: vessel ? `${loc}${loc ? ' — ' : ''}${vessel}` : loc,
      }
    })

    const hasActual = sorted.some(e => e.eventClassifierCode === 'ACT')
    const allActual = sorted.every(e => e.eventClassifierCode === 'ACT')
    const overallStatus = allActual ? 'delivered' : hasActual ? 'in-transit' : 'pending'

    // ETA = last estimated TRANSPORT ARRI event
    const etaEvent = [...sorted]
      .reverse()
      .find(
        e =>
          e.eventType === 'TRANSPORT' &&
          e.eventClassifierCode === 'EST' &&
          e.transportEventTypeCode === 'ARRI'
      )

    const origin = getLocation(sorted[0]) || sorted[0].transportCall?.unLocationCode || ''
    const destination = etaEvent
      ? getLocation(etaEvent) || etaEvent.transportCall?.unLocationCode || ''
      : getLocation(sorted[sorted.length - 1]) || ''

    const docRefs = events[0]?.documentReferences ?? []
    const blNumber =
      docRefs.find(d => d.documentReferenceType === 'TRD')?.documentReferenceValue ?? null
    const bookingRef =
      docRefs.find(d => d.documentReferenceType === 'BKG')?.documentReferenceValue ?? null

    return NextResponse.json({
      id: value,
      blNumber,
      bookingRef,
      origin,
      destination,
      status: overallStatus,
      estimatedDelivery: etaEvent
        ? new Date(etaEvent.eventDateTime).toLocaleDateString('fr-FR')
        : '',
      timeline,
    })
  } catch (err) {
    console.error('[api/tracking]', err)
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 })
  }
}

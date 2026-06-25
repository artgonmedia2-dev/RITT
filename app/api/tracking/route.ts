import { NextResponse } from 'next/server'
import * as fs from 'fs'
import * as path from 'path'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Missing tracking ID' }, { status: 400 })
  }

  let events = [];

  try {
    // 1. Tenter de récupérer depuis l'API MSC si la clé API est configurée
    const apiKey = process.env.MSC_API_KEY;
    let apiSuccess = false;

    if (apiKey) {
      const baseUrl = 'https://portal.api.msc.com/dpo/trackandtrace/v2.2/events';
      
      const fetchEvents = async (queryParam: string) => {
        const url = `${baseUrl}?${queryParam}=${encodeURIComponent(id)}`;
        const response = await fetch(url, {
          headers: {
            'Ocp-Apim-Subscription-Key': apiKey,
          }
        });
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            return data;
          }
        }
        return null;
      };

      // Si le format correspond à un conteneur (ex: MSCU1234567 -> 4 lettres + 7 chiffres)
      const isContainer = /^[A-Z]{4}\d{7}$/i.test(id);
      
      let fetchedData = null;
      if (isContainer) {
        fetchedData = await fetchEvents('equipmentReference');
        if (!fetchedData) fetchedData = await fetchEvents('transportDocumentReference');
      } else {
        fetchedData = await fetchEvents('transportDocumentReference');
        if (!fetchedData) fetchedData = await fetchEvents('equipmentReference');
      }

      if (fetchedData) {
        events = fetchedData;
        apiSuccess = true;
      }
    }

    // 2. Si l'API échoue ou n'est pas configurée, on utilise response.txt en fallback
    if (!apiSuccess) {
      const filePath = path.join(process.cwd(), 'response.txt');
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        events = JSON.parse(fileContent);
      } else {
        return NextResponse.json({ error: 'Source data not found and API fetch failed' }, { status: 404 });
      }
    }

    // 3. Traiter et formater les événements
    events.sort((a: any, b: any) => new Date(a.eventDateTime).getTime() - new Date(b.eventDateTime).getTime());

    const timeline = events.map((ev: any) => {
      const isPast = new Date(ev.eventDateTime) <= new Date();
      const locName = ev.eventLocation?.locationName;
      const locCode = ev.transportCall?.unLocationCode;
      const location = locName && locCode ? `${locName} (${locCode})` : locName || locCode || 'Unknown Location';
      
      return {
        date: new Date(ev.eventDateTime).toLocaleString('fr-FR', {
          year: 'numeric', month: '2-digit', day: '2-digit',
          hour: '2-digit', minute: '2-digit'
        }),
        status: isPast ? 'completed' : 'pending',
        label: ev.description || ev.transportEventTypeCode || ev.equipmentEventTypeCode,
        location: location
      };
    });

    let currentFound = false;
    for (let i = timeline.length - 1; i >= 0; i--) {
      if (timeline[i].status === 'completed' && !currentFound) {
        timeline[i].status = 'current';
        currentFound = true;
      }
    }

    const lastEvent = events[events.length - 1];
    let overallStatus = 'in-transit';
    if (
      lastEvent?.description?.toLowerCase().includes('discharged') || 
      lastEvent?.equipmentEventTypeCode === 'DISC' || 
      timeline.some((t: any) => t.label.toLowerCase().includes('livraison'))
    ) {
      overallStatus = 'delivered';
    }

    const firstEventLoc = events[0]?.eventLocation?.locationName || events[0]?.transportCall?.unLocationCode || 'Origine Inconnue';
    const lastEventLoc = events[events.length - 1]?.eventLocation?.locationName || events[events.length - 1]?.transportCall?.unLocationCode || 'Destination Inconnue';

    const estimatedDeliveryEvent = events.find((e: any) => e.eventClassifierCode === 'EST');
    const estimatedDelivery = estimatedDeliveryEvent 
      ? new Date(estimatedDeliveryEvent.eventDateTime).toLocaleDateString('fr-FR')
      : new Date(events[events.length - 1].eventDateTime).toLocaleDateString('fr-FR');

    const trackingData = {
      id: id,
      origin: firstEventLoc,
      destination: lastEventLoc,
      status: overallStatus,
      estimatedDelivery: estimatedDelivery,
      timeline: timeline
    };

    return NextResponse.json(trackingData);
  } catch (err) {
    console.error('Tracking API Error:', err);
    return NextResponse.json({ error: 'Failed to process tracking data' }, { status: 500 });
  }
}

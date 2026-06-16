import { z } from 'zod'

export const step1Schema = z.object({
  service: z.enum(['sea-freight', 'air-freight', 'road-freight', 'transit-customs', 'supply-chain', 'import-export'] as const, {
    message: 'Veuillez sélectionner un service',
  }),
})

export const step2Schema = z.object({
  origine: z.string().min(2, 'Pays d\'origine requis'),
  destination: z.string().min(2, 'Pays de destination requis'),
  poids: z.string().min(1, 'Poids requis').regex(/^\d+(\.\d+)?$/, 'Poids invalide'),
  longueur: z.string().optional(),
  largeur: z.string().optional(),
  hauteur: z.string().optional(),
  typeMarchandise: z.string().min(1, 'Type de marchandise requis'),
})

export const step3Schema = z.object({
  incoterm: z.enum(['FOB', 'CIF', 'DDP', 'EXW', 'DAP', 'CFR'] as const, {
    message: 'Veuillez sélectionner un Incoterm',
  }),
  urgence: z.enum(['standard', 'express', 'urgent'] as const),
  assurance: z.boolean(),
  notes: z.string().optional(),
})

export const step4Schema = z.object({
  societe: z.string().min(2, 'Société requise'),
  nom: z.string().min(2, 'Nom requis'),
  prenom: z.string().min(2, 'Prénom requis'),
  email: z.string().email('Email invalide'),
  telephone: z.string().min(8, 'Téléphone requis'),
  rgpd: z.boolean().refine((v) => v === true, { message: 'Vous devez accepter la politique de confidentialité' }),
})

export const contactSchema = z.object({
  name: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Sujet requis'),
  message: z.string().min(10, 'Message trop court (min. 10 caractères)'),
})

export type Step1Data = z.infer<typeof step1Schema>
export type Step2Data = z.infer<typeof step2Schema>
export type Step3Data = z.infer<typeof step3Schema>
export type Step4Data = z.infer<typeof step4Schema>
export type ContactData = z.infer<typeof contactSchema>

export type WizardData = Step1Data & Step2Data & Step3Data & Step4Data

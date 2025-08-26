import { z } from 'zod';

export const talentSchema = z.object({
  fullName: z.string().min(3, {
    message: 'El nombre completo debe tener al menos 3 caracteres.',
  }),
  seniority: z.string().min(1, { message: 'La seniority es requerida.' }),
  role: z.string().min(1, { message: 'El rol es requerido.' }),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  leaderId: z.string().optional().transform(val => val === '__NONE__' || val === '' ? null : val),
  mentorId: z.string().optional().transform(val => val === '__NONE__' || val === '' ? null : val),
});

export type TalentFormValues = z.infer<typeof talentSchema>;

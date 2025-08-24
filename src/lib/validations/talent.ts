import { z } from 'zod';

export const talentSchema = z.object({
  fullName: z.string().min(3, {
    message: 'El nombre completo debe tener al menos 3 caracteres.',
  }),
  seniority: z.string().min(1, { message: 'La seniority es requerida.' }),
  role: z.string().min(1, { message: 'El rol es requerido.' }),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  leaderId: z.string().cuid().optional().nullable(),
  mentorId: z.string().cuid().optional().nullable(),
});

export type TalentFormValues = z.infer<typeof talentSchema>;

import { z } from 'zod';

// Esquema esperado para la respuesta de un bug
export const bugSchema = z.object({
  id: z.string(),
  title: z.string(),
  module: z.string(),
  priority: z.enum(['low', 'medium', 'high']),
  description: z.string(),
  expectedResult: z.string(),
  actualResult: z.string(),
  status: z.enum(['pending', 'completed']),
});

// Tipo generado a partir del esquema
export type BugSchema = z.infer<typeof bugSchema>;
import { z } from 'zod'

export const alunoSchema = z.object({
  nome: z.string().trim().min(2, 'Informe o nome do aluno'),
  dataNascimento: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use o formato AAAA-MM-DD'),
})

export const instrutorSchema = z.object({
  nome: z.string().trim().min(2, 'Informe o nome do instrutor'),
  especialidade: z.string().trim().min(2, 'Informe a especialidade'),
})

export const aulaSchema = z.object({
  nome: z.string().trim().min(2, 'Informe o nome da aula'),
  horario: z.string().trim().min(2, 'Informe o horário'),
  instrutorId: z.coerce.number().int().positive('Selecione um instrutor'),
})

export const matriculaSchema = z.object({
  dataMatricula: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use o formato AAAA-MM-DD'),
  alunoId: z.coerce.number().int().positive('Selecione um aluno'),
  aulaId: z.coerce.number().int().positive('Selecione uma aula'),
})

export type AlunoSchema = z.infer<typeof alunoSchema>
export type InstrutorSchema = z.infer<typeof instrutorSchema>
export type AulaSchema = z.infer<typeof aulaSchema>
export type MatriculaSchema = z.infer<typeof matriculaSchema>

export type Aula = {
  id: number
  nome: string
  horario: string
  instrutorId: number
  instrutorNome: string
}

export type AulaFormValues = {
  nome: string
  horario: string
  instrutorId: number
}

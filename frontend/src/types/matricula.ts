export type Matricula = {
  id: number
  dataMatricula: string
  alunoId: number
  alunoNome: string
  aulaId: number
  aulaNome: string
}

export type MatriculaFormValues = {
  dataMatricula: string
  alunoId: number
  aulaId: number
}

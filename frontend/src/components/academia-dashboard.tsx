import { useMemo, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  CalendarDays,
  Dumbbell,
  GraduationCap,
  RefreshCcw,
  Trash2,
  Users,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { alunoSchema, aulaSchema, instrutorSchema, matriculaSchema } from '@/lib/validators'
import { useAlunos } from '@/hooks/useAlunos'
import { useAulas } from '@/hooks/useAulas'
import { useInstrutores } from '@/hooks/useInstrutores'
import { useMatriculas } from '@/hooks/useMatriculas'
import type { AlunoFormValues } from '@/types/aluno'
import type { InstrutorFormValues } from '@/types/instrutor'

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`)
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('pt-BR').format(date)
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <Card className="border-slate-800 bg-slate-900/80 text-white">
      <CardHeader className="pb-3">
        <CardDescription className="text-slate-300">{label}</CardDescription>
        <CardTitle className="text-3xl text-white">{value}</CardTitle>
      </CardHeader>
    </Card>
  )
}

function SectionTitle({
  icon,
  title,
  description,
}: {
  icon: ReactNode
  title: string
  description: string
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-blue-900">
        {icon}
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{title}</h2>
      </div>
      <p className="text-sm text-slate-500">{description}</p>
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500">
      {message}
    </div>
  )
}

function ActionError({ message }: { message: string | null }) {
  if (!message) return null
  return <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{message}</div>
}

export function AcademiaDashboard() {
  const alunosState = useAlunos()
  const instrutoresState = useInstrutores()
  const aulasState = useAulas()
  const matriculasState = useMatriculas()

  const alunoForm = useForm<AlunoFormValues>({
    resolver: zodResolver(alunoSchema),
    defaultValues: { nome: '', dataNascimento: '' },
  })
  const instrutorForm = useForm<InstrutorFormValues>({
    resolver: zodResolver(instrutorSchema),
    defaultValues: { nome: '', especialidade: '' },
  })
  const aulaForm = useForm<z.input<typeof aulaSchema>, unknown, z.output<typeof aulaSchema>>({
    resolver: zodResolver(aulaSchema),
    defaultValues: { nome: '', horario: '', instrutorId: 0 },
  })
  const matriculaForm = useForm<
    z.input<typeof matriculaSchema>,
    unknown,
    z.output<typeof matriculaSchema>
  >({
    resolver: zodResolver(matriculaSchema),
    defaultValues: { dataMatricula: '', alunoId: 0, aulaId: 0 },
  })

  const totals = useMemo(
    () => ({
      alunos: alunosState.alunos.length,
      instrutores: instrutoresState.instrutores.length,
      aulas: aulasState.aulas.length,
      matriculas: matriculasState.matriculas.length,
    }),
    [
      alunosState.alunos.length,
      aulasState.aulas.length,
      instrutoresState.instrutores.length,
      matriculasState.matriculas.length,
    ],
  )

  const refreshAll = () => {
    void alunosState.fetchAlunos()
    void instrutoresState.fetchInstrutores()
    void aulasState.fetchAulas()
    void matriculasState.fetchMatriculas()
  }

  async function onSubmitAluno(values: AlunoFormValues) {
    const created = await alunosState.createAluno(values)
    if (created) alunoForm.reset()
  }

  async function onSubmitInstrutor(values: InstrutorFormValues) {
    const created = await instrutoresState.createInstrutor(values)
    if (created) instrutorForm.reset()
  }

  async function onSubmitAula(values: z.output<typeof aulaSchema>) {
    const created = await aulasState.createAula(values)
    if (created) aulaForm.reset({ nome: '', horario: '', instrutorId: 0 })
  }

  async function onSubmitMatricula(values: z.output<typeof matriculaSchema>) {
    const created = await matriculasState.createMatricula(values)
    if (created) matriculaForm.reset({ dataMatricula: '', alunoId: 0, aulaId: 0 })
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.16),_transparent_30%),linear-gradient(180deg,#eff6ff_0%,#ffffff_40%,#eff6ff_100%)] text-slate-950">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 text-white shadow-glow">
          <div className="grid gap-6 p-6 md:grid-cols-[1.35fr_0.9fr] md:p-8">
            <div className="space-y-4">
              <Badge className="w-fit bg-blue-500/15 text-blue-100 hover:bg-blue-500/15">
                Tema fitness / dashboard completo
              </Badge>
              <div className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
                  Gestão da academia em um só painel.
                </h1>
                <p className="max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                  Alunos, instrutores, aulas e matrículas com uma interface limpa, moderna e pronta
                  para conversar com a API Spring Boot.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button className="bg-white text-slate-950 hover:bg-slate-100" onClick={refreshAll}>
                  <RefreshCcw className="h-4 w-4" />
                  Atualizar tudo
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-700 bg-transparent text-white hover:bg-slate-900"
                  onClick={() => document.getElementById('alunos')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Ir para alunos
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2">
              <HeroStat label="Alunos" value={`${totals.alunos}`} />
              <HeroStat label="Instrutores" value={`${totals.instrutores}`} />
              <HeroStat label="Aulas" value={`${totals.aulas}`} />
              <HeroStat label="Matrículas" value={`${totals.matriculas}`} />
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card id="alunos" className="border-slate-200 shadow-lg">
            <CardHeader className="space-y-2">
              <SectionTitle
                icon={<Users className="h-5 w-5" />}
                title="Alunos"
                description="Cadastrar e listar alunos com validação e exclusão."
              />
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="grid gap-4" onSubmit={alunoForm.handleSubmit(onSubmitAluno)}>
                <div className="space-y-2">
                  <Label htmlFor="aluno-nome">Nome</Label>
                  <Input id="aluno-nome" placeholder="Ex.: Maria Silva" {...alunoForm.register('nome')} />
                  {alunoForm.formState.errors.nome ? (
                    <p className="text-sm text-red-600">{alunoForm.formState.errors.nome.message}</p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aluno-data">Data de nascimento</Label>
                  <Input id="aluno-data" type="date" {...alunoForm.register('dataNascimento')} />
                  {alunoForm.formState.errors.dataNascimento ? (
                    <p className="text-sm text-red-600">
                      {alunoForm.formState.errors.dataNascimento.message}
                    </p>
                  ) : null}
                </div>
                <Button type="submit" className="bg-slate-950 text-white hover:bg-slate-800" disabled={alunosState.saving}>
                  {alunosState.saving ? 'Salvando...' : 'Salvar aluno'}
                </Button>
              </form>

              <ActionError message={alunosState.error} />

              {alunosState.loading ? (
                <EmptyState message="Carregando alunos..." />
              ) : alunosState.alunos.length === 0 ? (
                <EmptyState message="Nenhum aluno cadastrado ainda." />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Nascimento</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {alunosState.alunos.map((aluno) => (
                      <TableRow key={aluno.id}>
                        <TableCell className="font-medium">{aluno.id}</TableCell>
                        <TableCell>{aluno.nome}</TableCell>
                        <TableCell>{formatDate(aluno.dataNascimento)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => alunosState.deleteAluno(aluno.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <Card id="instrutores" className="border-slate-200 shadow-lg">
            <CardHeader className="space-y-2">
              <SectionTitle
                icon={<GraduationCap className="h-5 w-5" />}
                title="Instrutores"
                description="Cadastrar instrutores e organizar a equipe da academia."
              />
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="grid gap-4" onSubmit={instrutorForm.handleSubmit(onSubmitInstrutor)}>
                <div className="space-y-2">
                  <Label htmlFor="instrutor-nome">Nome</Label>
                  <Input id="instrutor-nome" placeholder="Ex.: João Pedro" {...instrutorForm.register('nome')} />
                  {instrutorForm.formState.errors.nome ? (
                    <p className="text-sm text-red-600">{instrutorForm.formState.errors.nome.message}</p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instrutor-especialidade">Especialidade</Label>
                  <Input
                    id="instrutor-especialidade"
                    placeholder="Ex.: Musculação"
                    {...instrutorForm.register('especialidade')}
                  />
                  {instrutorForm.formState.errors.especialidade ? (
                    <p className="text-sm text-red-600">
                      {instrutorForm.formState.errors.especialidade.message}
                    </p>
                  ) : null}
                </div>
                <Button type="submit" className="bg-slate-950 text-white hover:bg-slate-800" disabled={instrutoresState.saving}>
                  {instrutoresState.saving ? 'Salvando...' : 'Salvar instrutor'}
                </Button>
              </form>

              <ActionError message={instrutoresState.error} />

              {instrutoresState.loading ? (
                <EmptyState message="Carregando instrutores..." />
              ) : instrutoresState.instrutores.length === 0 ? (
                <EmptyState message="Nenhum instrutor cadastrado ainda." />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Especialidade</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {instrutoresState.instrutores.map((instrutor) => (
                      <TableRow key={instrutor.id}>
                        <TableCell className="font-medium">{instrutor.id}</TableCell>
                        <TableCell>{instrutor.nome}</TableCell>
                        <TableCell>{instrutor.especialidade}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => instrutoresState.deleteInstrutor(instrutor.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card id="aulas" className="border-slate-200 shadow-lg">
            <CardHeader className="space-y-2">
              <SectionTitle
                icon={<Dumbbell className="h-5 w-5" />}
                title="Aulas"
                description="Cadastrar aulas vinculadas a instrutores."
              />
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="grid gap-4" onSubmit={aulaForm.handleSubmit(onSubmitAula)}>
                <div className="space-y-2">
                  <Label htmlFor="aula-nome">Nome</Label>
                  <Input id="aula-nome" placeholder="Ex.: Spinning" {...aulaForm.register('nome')} />
                  {aulaForm.formState.errors.nome ? (
                    <p className="text-sm text-red-600">{aulaForm.formState.errors.nome.message}</p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aula-horario">Horário</Label>
                  <Input id="aula-horario" placeholder="Ex.: 07:30" {...aulaForm.register('horario')} />
                  {aulaForm.formState.errors.horario ? (
                    <p className="text-sm text-red-600">{aulaForm.formState.errors.horario.message}</p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aula-instrutor">Instrutor</Label>
                  <select
                    id="aula-instrutor"
                    className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    {...aulaForm.register('instrutorId', { valueAsNumber: true })}
                  >
                    <option value={0}>Selecione um instrutor</option>
                    {instrutoresState.instrutores.map((instrutor) => (
                      <option key={instrutor.id} value={instrutor.id}>
                        {instrutor.nome} — {instrutor.especialidade}
                      </option>
                    ))}
                  </select>
                  {aulaForm.formState.errors.instrutorId ? (
                    <p className="text-sm text-red-600">{aulaForm.formState.errors.instrutorId.message}</p>
                  ) : null}
                </div>
                <Button type="submit" className="bg-slate-950 text-white hover:bg-slate-800" disabled={aulasState.saving}>
                  {aulasState.saving ? 'Salvando...' : 'Salvar aula'}
                </Button>
              </form>

              <ActionError message={aulasState.error} />

              {aulasState.loading ? (
                <EmptyState message="Carregando aulas..." />
              ) : aulasState.aulas.length === 0 ? (
                <EmptyState message="Nenhuma aula cadastrada ainda." />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Horário</TableHead>
                      <TableHead>Instrutor</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {aulasState.aulas.map((aula) => (
                      <TableRow key={aula.id}>
                        <TableCell className="font-medium">{aula.id}</TableCell>
                        <TableCell>{aula.nome}</TableCell>
                        <TableCell>{aula.horario}</TableCell>
                        <TableCell>{aula.instrutorNome}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => aulasState.deleteAula(aula.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <Card id="matriculas" className="border-slate-200 shadow-lg">
            <CardHeader className="space-y-2">
              <SectionTitle
                icon={<CalendarDays className="h-5 w-5" />}
                title="Matrículas"
                description="Vincular alunos às aulas com data de matrícula."
              />
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="grid gap-4" onSubmit={matriculaForm.handleSubmit(onSubmitMatricula)}>
                <div className="space-y-2">
                  <Label htmlFor="matricula-data">Data da matrícula</Label>
                  <Input
                    id="matricula-data"
                    type="date"
                    {...matriculaForm.register('dataMatricula')}
                  />
                  {matriculaForm.formState.errors.dataMatricula ? (
                    <p className="text-sm text-red-600">
                      {matriculaForm.formState.errors.dataMatricula.message}
                    </p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="matricula-aluno">Aluno</Label>
                  <select
                    id="matricula-aluno"
                    className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    {...matriculaForm.register('alunoId', { valueAsNumber: true })}
                  >
                    <option value={0}>Selecione um aluno</option>
                    {alunosState.alunos.map((aluno) => (
                      <option key={aluno.id} value={aluno.id}>
                        {aluno.nome}
                      </option>
                    ))}
                  </select>
                  {matriculaForm.formState.errors.alunoId ? (
                    <p className="text-sm text-red-600">
                      {matriculaForm.formState.errors.alunoId.message}
                    </p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="matricula-aula">Aula</Label>
                  <select
                    id="matricula-aula"
                    className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    {...matriculaForm.register('aulaId', { valueAsNumber: true })}
                  >
                    <option value={0}>Selecione uma aula</option>
                    {aulasState.aulas.map((aula) => (
                      <option key={aula.id} value={aula.id}>
                        {aula.nome} — {aula.instrutorNome}
                      </option>
                    ))}
                  </select>
                  {matriculaForm.formState.errors.aulaId ? (
                    <p className="text-sm text-red-600">
                      {matriculaForm.formState.errors.aulaId.message}
                    </p>
                  ) : null}
                </div>
                <Button
                  type="submit"
                  className="bg-slate-950 text-white hover:bg-slate-800"
                  disabled={matriculasState.saving}
                >
                  {matriculasState.saving ? 'Salvando...' : 'Salvar matrícula'}
                </Button>
              </form>

              <ActionError message={matriculasState.error} />

              {matriculasState.loading ? (
                <EmptyState message="Carregando matrículas..." />
              ) : matriculasState.matriculas.length === 0 ? (
                <EmptyState message="Nenhuma matrícula cadastrada ainda." />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Aluno</TableHead>
                      <TableHead>Aula</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {matriculasState.matriculas.map((matricula) => (
                      <TableRow key={matricula.id}>
                        <TableCell className="font-medium">{matricula.id}</TableCell>
                        <TableCell>{formatDate(matricula.dataMatricula)}</TableCell>
                        <TableCell>{matricula.alunoNome}</TableCell>
                        <TableCell>{matricula.aulaNome}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => matriculasState.deleteMatricula(matricula.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}

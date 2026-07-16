import { useCallback, useEffect, useState } from 'react'

import { api } from '@/lib/api'
import type { Aluno, AlunoFormValues } from '@/types/aluno'

export function useAlunos() {
  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAlunos = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const { data } = await api.get<Aluno[]>('/alunos')
      setAlunos(data)
    } catch {
      setError('Não foi possível carregar os alunos.')
    } finally {
      setLoading(false)
    }
  }, [])

  const createAluno = useCallback(async (payload: AlunoFormValues) => {
    setSaving(true)
    setError(null)

    try {
      const { data } = await api.post<Aluno>('/alunos', payload)
      setAlunos((current) => [data, ...current])
      return data
    } catch {
      setError('Não foi possível cadastrar o aluno.')
      return null
    } finally {
      setSaving(false)
    }
  }, [])

  const deleteAluno = useCallback(async (id: number) => {
    setError(null)
    try {
      await api.delete(`/alunos/${id}`)
      setAlunos((current) => current.filter((item) => item.id !== id))
    } catch {
      setError('Não foi possível excluir o aluno.')
    }
  }, [])

  useEffect(() => {
    void fetchAlunos()
  }, [fetchAlunos])

  return {
    alunos,
    loading,
    saving,
    error,
    fetchAlunos,
    createAluno,
    deleteAluno,
  }
}

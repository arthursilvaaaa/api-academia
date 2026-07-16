import { useCallback, useEffect, useState } from 'react'

import { api } from '@/lib/api'
import type { Matricula, MatriculaFormValues } from '@/types/matricula'

export function useMatriculas() {
  const [matriculas, setMatriculas] = useState<Matricula[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMatriculas = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await api.get<Matricula[]>('/matriculas')
      setMatriculas(data)
    } catch {
      setError('Não foi possível carregar as matrículas.')
    } finally {
      setLoading(false)
    }
  }, [])

  const createMatricula = useCallback(async (payload: MatriculaFormValues) => {
    setSaving(true)
    setError(null)
    try {
      const { data } = await api.post<Matricula>('/matriculas', payload)
      setMatriculas((current) => [data, ...current])
      return data
    } catch {
      setError('Não foi possível cadastrar a matrícula.')
      return null
    } finally {
      setSaving(false)
    }
  }, [])

  const deleteMatricula = useCallback(async (id: number) => {
    setError(null)
    try {
      await api.delete(`/matriculas/${id}`)
      setMatriculas((current) => current.filter((item) => item.id !== id))
    } catch {
      setError('Não foi possível excluir a matrícula.')
    }
  }, [])

  useEffect(() => {
    void fetchMatriculas()
  }, [fetchMatriculas])

  return { matriculas, loading, saving, error, fetchMatriculas, createMatricula, deleteMatricula }
}

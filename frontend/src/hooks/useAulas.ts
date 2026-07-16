import { useCallback, useEffect, useState } from 'react'

import { api } from '@/lib/api'
import type { Aula, AulaFormValues } from '@/types/aula'

export function useAulas() {
  const [aulas, setAulas] = useState<Aula[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAulas = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await api.get<Aula[]>('/aulas')
      setAulas(data)
    } catch {
      setError('Não foi possível carregar as aulas.')
    } finally {
      setLoading(false)
    }
  }, [])

  const createAula = useCallback(async (payload: AulaFormValues) => {
    setSaving(true)
    setError(null)
    try {
      const { data } = await api.post<Aula>('/aulas', payload)
      setAulas((current) => [data, ...current])
      return data
    } catch {
      setError('Não foi possível cadastrar a aula.')
      return null
    } finally {
      setSaving(false)
    }
  }, [])

  const deleteAula = useCallback(async (id: number) => {
    setError(null)
    try {
      await api.delete(`/aulas/${id}`)
      setAulas((current) => current.filter((item) => item.id !== id))
    } catch {
      setError('Não foi possível excluir a aula.')
    }
  }, [])

  useEffect(() => {
    void fetchAulas()
  }, [fetchAulas])

  return { aulas, loading, saving, error, fetchAulas, createAula, deleteAula }
}

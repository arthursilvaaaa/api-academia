import { useCallback, useEffect, useState } from 'react'

import { api } from '@/lib/api'
import type { Instrutor, InstrutorFormValues } from '@/types/instrutor'

export function useInstrutores() {
  const [instrutores, setInstrutores] = useState<Instrutor[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchInstrutores = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await api.get<Instrutor[]>('/instrutores')
      setInstrutores(data)
    } catch {
      setError('Não foi possível carregar os instrutores.')
    } finally {
      setLoading(false)
    }
  }, [])

  const createInstrutor = useCallback(async (payload: InstrutorFormValues) => {
    setSaving(true)
    setError(null)
    try {
      const { data } = await api.post<Instrutor>('/instrutores', payload)
      setInstrutores((current) => [data, ...current])
      return data
    } catch {
      setError('Não foi possível cadastrar o instrutor.')
      return null
    } finally {
      setSaving(false)
    }
  }, [])

  const deleteInstrutor = useCallback(async (id: number) => {
    setError(null)
    try {
      await api.delete(`/instrutores/${id}`)
      setInstrutores((current) => current.filter((item) => item.id !== id))
    } catch {
      setError('Não foi possível excluir o instrutor.')
    }
  }, [])

  useEffect(() => {
    void fetchInstrutores()
  }, [fetchInstrutores])

  return { instrutores, loading, saving, error, fetchInstrutores, createInstrutor, deleteInstrutor }
}

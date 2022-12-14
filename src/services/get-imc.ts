import { api } from './api'

export type Imc = {
  id?: number
  imc?: string
  id_profissional?: number
  id_aluno?: number
  data?: Date
}

type UserResponse = {
  status: number
  data: Imc
}

export const postImc = async (payload: Imc): Promise<UserResponse> => {
  const { data, status } = await api.post('imc', payload)

  return { status, data }
}

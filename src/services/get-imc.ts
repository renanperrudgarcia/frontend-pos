import { api } from './api'

export type ImcPayload = {
  height?: number
  weight?: number
  id_student?: number
  id_professional?: number
}

export type Imc = {
  imc?: number
  classificacao?: string
  aluno?: string
  personal?: string
  data?: string
}

type ImcResponse = {
  status?: number
  data?: Imc
  error?: any
}

export const postImc = async (payload: ImcPayload): Promise<ImcResponse> => {
  try {
    const { data, status } = await api.post('imc', payload)
    return { status, data }
  
  } catch (error) {
  
    return  { error: error.response.data.message, status: error.response.status }
  }
}

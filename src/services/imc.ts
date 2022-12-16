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

export type ImcList = {
  imc?: string
  classificacao?: string
  nomeAluno?: string
  nomePersonal?: string
  dataAvalicao?: string
}



export const postImc = async (payload: ImcPayload): Promise<ImcResponse> => {
  try {
    const { data, status } = await api.post('calculate-imc', payload)
    console.log({data})
    return { status, data }
  
  } catch (error) {
    console.log({error: error})

    return  { error: error.response.data.message, status: error.response.status }
  }
}

export const getImcByIduser = async (id_user: number): Promise<ImcList[]> => {
  const { data, status } = await api.get<ImcList[]>(`imc/${id_user}`)
  return status === 200 ? data : []
}



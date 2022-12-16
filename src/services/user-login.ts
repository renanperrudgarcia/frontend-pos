import { api } from './api'
import { User } from './users'

export type LoginPayload = {
  user: string
  password: string
}

export type LoginResponse = {
  data: Token | any
  status: string | number
}

export type GetMeResponse = {
  data: User
  status: string | number
}

export type Token = {
  access_token?: string
  expires_in?: number
}

export const getMe = async (access_token: string) => {
  const { data, status } = await api.get('me', { headers: { Authorization: `Bearer ${access_token}` } })

  return { data, status }
}

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data, status } = await api.post('login', payload)

  return { status, data }
}

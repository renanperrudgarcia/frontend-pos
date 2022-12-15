/* eslint-disable no-restricted-globals */
import { api } from './api'
import { User } from './get-users'

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

// export type UserMe = {
//   userMe: User
// }

export const getMe = async (access_token: string): Promise<GetMeResponse> => {
  const { data, status } = await api.get<User>('me', { headers: { Authorization: `Bearer ${access_token}`} })

  return { data, status }
}

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data, status } = await api.post('login', payload)

  return { status, data }
}

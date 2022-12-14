/* eslint-disable no-restricted-globals */
import { api } from './api'
import { User } from './get-users'

export type LoginPayload = {
  user?: string
  password?: string
}

export type LoginResponse = {
  data: Token | any
  status: string | number
}

export type GetMeResponse = {
  data: UserMe
  status: string | number
}

export type Token = {
  access_token?: string
  expires_in?: number
}

export type UserMe = {
  userMe: User
}

export const getMe = async (access_token: string): Promise<GetMeResponse> => {
  const { data, status } = await api.get<UserMe>('/me', { headers: { Authorization: access_token } })
  return { data, status }
}

const api2 = async (method: string, uri: string, config?: {}) => {
  return await fetch(`${process.env.REACT_APP_API_URL}${uri}`, {
    method,
    headers: { 'accept': 'application/json',  },
    ...config
  }).then(res => res.status >= 400 ? {status: res.status} : res.json())
} 

export async function loginUser({ payload }: { payload: LoginPayload} ): Promise<LoginResponse> {
  // try {
    const data = await api2('POST', '/login', {
      body: JSON.stringify(payload),
    })
    console.log(data)
    return { data, status: 1 }
  // } catch (error) {
    // console.log(error)
    return { data, status }
  // }
}

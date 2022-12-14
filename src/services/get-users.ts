import { FormError } from "../pages/register-user"
import { api } from "./api"

export type User = {
  id?: string
  nome?: string
  usuario?: string
  email?: string
  tipo_usuario?: number
  senha?: string
  access_token?: string
  expires_in?: number
}

export type UserPayload = {
  id?: string
  name?: string
  user?: string
  email?: string
  type_user?: number
  password?: string
}

export type UserErrors = {
  nome?: FormError
  usuario?: FormError
  email?: FormError
  tipo_usuario?: FormError
  senha?: FormError
}

type TypeUser = {
  id: number
  nome: string
}

type UserResponse = {
  status: number
  data: User
}

// export const getUsers = async () => {
//   const { data, status } = await api.get('users')
//   return status === 200 ? data : []
// }

export const postUsers = async (payload: UserPayload): Promise<UserResponse> => {
  const { data, status } = await api.post('user', payload)

  return { status, data }
}

export const getTypeUser = async (): Promise<TypeUser[]> => {
  const { data, status } = await api.get<TypeUser[]>('types-users')
  return status === 200 ? data : []
}

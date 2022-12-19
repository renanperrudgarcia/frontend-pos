import { FormError } from "../pages/register-user";
import { api } from "./api";

export type User = {
  id: number;
  nome: string;
  usuario: string;
  email: string;
  tipo_usuario: number;
  access_token: string;
  expires_in: number;
};

export type UserPayload = {
  id?: string;
  name?: string;
  user?: string;
  email?: string;
  type_user?: number;
  password?: string;
};

export type UserErrors = {
  nome?: FormError;
  usuario?: FormError;
  email?: FormError;
  tipo_usuario?: FormError;
  senha?: FormError;
};

type TypeUser = {
  id: number;
  nome: string;
};

type UserResponse = {
  status?: number | string;
  data?: any[] | any;
  error?: any;
};

type UserByTypeResponse = {
  status?: number | string;
  data?: User[];
};

export const postUsers = async (
  payload: UserPayload
): Promise<UserResponse> => {
  try {
    const { data, status } = await api.post("user", payload);
    return { status, data };
  } catch (error) {
    return {
      error: error.response.data.message,
      status: error.response.status,
    };
  }
};

export const getUserByTypeUser = async (
  id?: number,
  name?: string
): Promise<UserByTypeResponse | any> => {
  let params = { type_user: 0, name: "" };
  if (id) {
    params.type_user = id;
  }
  if (name) {
    params.name = name;
  }

  const { data, status } = await api.get<User[]>("user", {
    params: params,
  });
  return status === 200 ? data : [];
};

export const getTypeUser = async (): Promise<TypeUser[]> => {
  const { data, status } = await api.get<TypeUser[]>("types-users");
  return status === 200 ? data : [];
};

import { useEffect, useState } from 'react'
import { Button, Container, Flex, Text } from '@chakra-ui/react'
import { getTypeUser, postUsers, User, UserPayload } from '../../services/get-users'
import { validateEmail } from '../../utils/misc'
import { InputForm } from '../../components/InputForm'
import { Link } from 'react-router-dom'

type formDataCreateUser = {
  user: UserPayload
}

export type SelectOptions = {
  label: string | number
  value: string | number
}

export type FormError = {
  isTyped?: boolean
  isError?: boolean
  message?: string
}

export const RegisterUser = () => {
  // const history = useHistory()
  const [formValues, setFormValues] = useState<formDataCreateUser>()

  const [nameIsError, setNameIsError] = useState<string | null>()
  const [emailIsError, setEmailIsError] = useState<string | null>()
  const [passwordIsError, setPasswordIsError] = useState<string | null>()
  const [typeUserIdIsError, setTypeUserIdIsError] = useState<string | null>()
  const [typesUserOptions, setTypesUserOptions] = useState<SelectOptions[]>([])

  const fetchTypeUser = async () => {
    const data = await getTypeUser()

    setTypesUserOptions(data.map(typeUser => ({ value: typeUser.id, label: typeUser.nome })))
  }

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target

    const valueForm = value
    const type = name.split('.')[0]
    const attribute = name.split('.')[1]

    // setFormValues({ ...formValues, [type]: { ...formValues?.[type], [attribute]: valueForm } })
  }

  const handleSubmit = async () => {
    // const userPayload = formValues.user as User 

    // postUsers({ ...userPayload }).then(function ({ status }) {
    // status === 201
    // })
  }

  useEffect(() => {
    fetchTypeUser()
  }, [])

  return (
    <Container mt={50}>
      <Text mb="10" fontSize={40} color="yellow.500">Cadastre-se </Text>

      <InputForm
        label='Nome'
        name="user.name"
        value={formValues?.user?.name || ''}
        onChange={handleInputChange}
        placeholder="Digite seu nome"
        errorMessage="O nome é obrigatório"
        isRequired
      />

      <InputForm
        label='Email'
        name="user.email"
        value={formValues?.user?.email || ''}
        onChange={handleInputChange}
        placeholder="Digite seu e-mail"
      />

      <InputForm
        label='Usuário'
        type="password"
        name="user.user"
        value={formValues?.user?.user || ''}
        onChange={handleInputChange}
        placeholder="Digite seu usuário"
        errorMessage="O usuário é obrigatório"
        isRequired
      />

      <InputForm
        label='Senha'
        type="password"
        name="user.password"
        value={formValues?.user?.password || ''}
        onChange={handleInputChange}
        placeholder="Digite sua senha"
        errorMessage="A senha é obrigatória"
        isRequired
      />

      <div
        style={{
          display: 'flex',
          flex: 1,
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'stretch',
        }}
      >
        <Text>Tipo de usuário *</Text>
        <select
          name="user.type_user_id"
          id=""
          value={formValues?.user?.type_user || ''}
          onChange={handleInputChange}
          style={{
            width: '100%',
            height: 50,
            padding: 10,
            borderRadius: 4,
            fontSize: 16,
            marginTop: 10,
            border: `1px solid ${typeUserIdIsError ? 'red' : 'black'}`,
          }}
        >
          <option>Selecione o tipo de usuario</option>
          {typesUserOptions.length >= 1 &&
            typesUserOptions.map(typeUser => (
              <option key={typeUser.value} value={typeUser.value}>
                {typeUser.label}
              </option>
            ))}
        </select>
      </div>

      <Flex alignItems="center" justifyContent="space-between" >
        <Link to="/login">
          Voltar
        </Link>
        <Button mt={4} onClick={handleSubmit} width={40} backgroundColor="yellow.500"> Cadastrar </Button>
      </Flex>
    </Container>
  )
}

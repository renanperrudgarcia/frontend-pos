import { useState } from 'react'
import { Button, Container, Flex, Text, useToast } from '@chakra-ui/react'
import { postUsers, UserPayload } from '../../services/users'
import { InputForm } from '../../components/InputForm'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UsersTypes } from '../../utils/constants'
import { withAuth } from '../../utils/hoc/with-auth'

export type SelectOptions = {
  label: string | number
  value: string | number
}

export type FormError = {
  isTyped?: boolean
  isError?: boolean
  message?: string
}

const RegisterUser = () => {
  const navigate = useNavigate();
  const { type } = useParams()

  const [formValues, setFormValues] = useState<UserPayload>({} as UserPayload)

  const toast = useToast({
    position: 'top',
    duration: 2000,
    isClosable: true,
  })

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target

    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = async () => {
    const userPayload = formValues

    userPayload.type_user = type === 'student' ? UsersTypes.STUDENT : UsersTypes.PERSONAL

    const { status, error } = await postUsers(userPayload)

    if (status >= 400) {
      toast({
        title: 'Atenção!',
        description: error,
        status: 'error',
      })
      return
    }

    toast({
      description: "Usuário cadastrado com sucesso!",
      status: 'success',
    })

    navigate("/");
  }

  return (
    <Container mt={50}>
      <Text mb="10" fontSize={40} color="purple">Cadastrar {type === 'student' ? 'Aluno' : 'Profissional'} </Text>

      <InputForm
        label='Nome'
        name="name"
        value={formValues?.name || ''}
        onChange={handleInputChange}
        placeholder="Digite seu nome"
        errorMessage="O nome é obrigatório"
        isRequired
      />

      <InputForm
        label='Email'
        name="email"
        value={formValues?.email || ''}
        onChange={handleInputChange}
        placeholder="Digite seu e-mail"
      />

      <InputForm
        label='Usuário'
        name="user"
        value={formValues?.user || ''}
        onChange={handleInputChange}
        placeholder="Digite seu usuário"
        errorMessage="O usuário é obrigatório"
        isRequired
      />

      <InputForm
        label='Senha'
        type="password"
        name="password"
        value={formValues?.password || ''}
        onChange={handleInputChange}
        placeholder="Digite sua senha"
        errorMessage="A senha é obrigatória"
        isRequired
      />

      <Flex alignItems="center" justifyContent="space-between" >
        <Link to="/">
          Voltar
        </Link>

        <Button mt={4} onClick={handleSubmit} width={40} backgroundColor="purple.300">Cadastrar</Button>
      </Flex>
    </Container>
  )
}

export default withAuth(RegisterUser, [UsersTypes.ADMIN, UsersTypes.PERSONAL])
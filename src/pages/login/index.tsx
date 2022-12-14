import { Button, Container, Flex, Text, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Providers/auth'
import { getMe, LoginPayload, loginUser } from '../../services/user'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { InputForm } from '../../components/InputForm'



export function Login() {
  // const { signin } = useAuth()
  const [formValues, setFormValues] = useState<LoginPayload>()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const toggleShowPassword = () => setShowPassword(!showPassword)
  const navigate = useNavigate();
  const toast = useToast()

  const notify = () => toast({
    position: 'top',
    title: 'Atenção!',
    description: "Credenciais Inválidas",
    status: 'error',
    duration: 2000,
    isClosable: true,
  })

  const handleLogin = async () => {
    if (!formValues)
      return

    const { data } = await loginUser({ payload: formValues })

    if (data.access_token) {
      const { status: meStatus, data: meData } = await getMe(data.access_token)

      if (meStatus === 200)
        console.log('a')
      // signin({ ...data, ...meData }, () => {
      //   navigate("/home");
      // })
    } else
      notify()
  }

  const handleSetFormValues = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target

    setFormValues((prevFormValues): { user?: string; password?: string } => ({ ...prevFormValues, [name]: value }))
  }

  return (
    <Container mt={50}>
      <Text mb="10" fontSize={40} color="yellow.500">Login</Text>

      <InputForm
        label='Usuário'
        name="user"
        value={formValues?.user || ''}
        onChange={handleSetFormValues}
        errorMessage="O usuário é obrigatório"
        isRequired
      />

      <InputForm
        label='Senha'
        type={showPassword ? 'text' : 'password'}
        name="password"
        value={formValues?.password || ''}
        onChange={handleSetFormValues}
        errorMessage="A senha é obrigatória"
        isRequired
        rightElement={{ action: toggleShowPassword, element: showPassword ? <FaEyeSlash /> : <FaEye /> }}
      />

      <Flex alignItems="center" justifyContent="space-between" >
        <Link to="/register-user">
          Cadastre-se
        </Link>
        <Button mt={4} onClick={handleLogin} width={40} backgroundColor="yellow.500"> Entrar </Button>
      </Flex>

    </Container >
  )
}

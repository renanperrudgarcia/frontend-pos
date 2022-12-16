import { Button, Container, Flex, Text, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Providers/auth'
import { getMe, LoginPayload, loginUser } from '../../services/user-login'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { InputForm } from '../../components/InputForm'

export function Login() {
  const { signin } = useAuth()
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

    const { data: { data } } = await loginUser(formValues)

    if (data?.access_token) {
      const { status: meStatus, data: { data: { userMe } } } = await getMe(data.access_token)
      console.log({ data, userMe })
      if (meStatus === 200)
        signin({ ...data, ...userMe }, () => {
            window.location.href = "http://www.devmedia.com.br";
        })

      return
    }

    notify()
  }

  const handleSetFormValues = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target

    setFormValues((prevFormValues): { user: string; password: string } => ({ ...prevFormValues, [name]: value }))
  }

  return (
    <Container mt={50}>
      <Text mb="10" fontSize={40} color="purple">Login</Text>

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

      <Flex justifyContent="flex-end" mt={4} >
        <Button onClick={handleLogin} width={40} backgroundColor="purple.300" color="white"> Entrar </Button>
      </Flex>

    </Container >
  )
}

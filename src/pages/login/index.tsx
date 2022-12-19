import { Button, CircularProgress, Container, Flex, Text, useToast } from '@chakra-ui/react'
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
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleLogin = async () => {
    if (!formValues) return

    setIsLoading(true)

    const { data: dataLogin, error } = await loginUser(formValues)

    if (dataLogin && dataLogin.data?.access_token) {
      const { data } = dataLogin
      const { status, data: dataMe } = await getMe(data.access_token)

      setIsLoading(false)

      if (status !== 200) {
        toast({
          position: 'top',
          title: 'Atenção!',
          description: error,
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }
      const { data: { userMe } } = dataMe

      signin({ ...data, ...userMe }, () => {
        navigate("/");
      })

      return
    }

    setIsLoading(false)

    toast({
      position: 'top',
      title: 'Atenção!',
      description: error,
      status: 'error',
      duration: 2000,
      isClosable: true,
    })
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

      <Flex justifyContent="flex-end" mt={4}>
        <Button isDisabled={isLoading} onClick={handleLogin} width={40} backgroundColor="purple.300" color="white">
          {isLoading
            ?
            <Flex alignItems="center"  >
              <CircularProgress isIndeterminate color='blue.300' size={5} />
            </Flex>
            :
            "Entrar"
          }
        </Button>
      </Flex>
    </Container >
  )
}

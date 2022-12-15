import { Button, CircularProgress, Container, Flex, Select, Text, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { InputForm } from '../../components/InputForm'
import { ImcPayload, postImc } from '../../services/get-imc'
import { getUserByTypeUser } from '../../services/get-users'
import { UsersTypes } from '../../utils/constants'

export type SelectOptionsUserType = {
  label: string
  value: number
}

export const Imc = () => {
  const [formValues, setFormValues] = useState<ImcPayload>()
  const toast = useToast()
  const [userPersonalOptions, setUserPersonalOptions] = useState<SelectOptionsUserType[]>([])
  const [userStudentOptions, setUserStudentOptions] = useState<SelectOptionsUserType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target

    const valueForm = value
    const type = name.split('.')[0]
    const attribute = name.split('.')[1]

    setFormValues({ ...formValues, [type]: { ...formValues?.[type], [attribute]: valueForm } })
  }

  const handleSubmit = async () => {

    const { data, status, error } = await postImc(formValues)

    console.log(data)
    if (status === 400) {
      toast({
        position: 'top',
        title: 'Atenção!',
        description: error,
        status: 'error',
        duration: 2000,
        isClosable: true,
      })

    } else {
      toast({
        position: 'top',
        description: "Usuário cadastrado com sucesso!",
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  const fetchUserStudent = async () => {
    setIsLoading(true)
    const { data } = await getUserByTypeUser(UsersTypes.STUDENT)
    setUserStudentOptions(data.map(user => ({ value: user.id, label: user.nome })))
    setIsLoading(false)
  }

  const fetchUserByTypeUserPersonal = async () => {
    setIsLoading(true)
    const { data } = await getUserByTypeUser(UsersTypes.PERSONAL)
    setUserPersonalOptions(data.map(user => ({ value: user.id, label: user.nome })))
    setIsLoading(false)
  }

  useEffect(() => {
    fetchUserStudent()
    fetchUserByTypeUserPersonal()
  }, [])

  return (
    <Container mt={50}>
      <Text mb="10" fontSize={40} color="yellow.500">Calcular IMC </Text>

      {isLoading ?
        <Flex alignItems="center"  >
          <Text>Aguardando carregamento...</Text>
          <CircularProgress isIndeterminate color='blue.300' ml={10} />
        </Flex> :
        <>

          <InputForm
            label='Altura em cm'
            name=""
            value=""
            placeholder="Digite sua Altura"
            errorMessage="A altura é obrigatória"
            isRequired
          />

          <InputForm
            label='Peso em Kg'
            name=""
            value=""
            placeholder="Digite seu peso"
            errorMessage="O peso é obrigatório"
            isRequired
          />

          <Text fontSize={16} mb={4}>Aluno *</Text>
          <Select
            placeholder="Selecione o Aluno"
            errorBorderColor="O aluno é obrigatório"
            boxShadow='base'
            rounded='md'
            bg='white'
            isRequired
          >
            {userStudentOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Text fontSize={16} mt={4} mb={4}>Profissional *</Text>
          <Select
            placeholder="Selecione o Profissional"
            errorBorderColor="O profissional é obrigatório"
            boxShadow='base'
            rounded='md'
            bg='white'
            isRequired
          >
            {userPersonalOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>


          <Flex alignItems="center" justifyContent="space-between" >
            <Link to="/home">
              Voltar
            </Link>
            <Button mt={4} onClick={handleSubmit} width={40} backgroundColor="yellow.500"> Calcular </Button>
          </Flex>
        </>}
    </Container>
  )
}

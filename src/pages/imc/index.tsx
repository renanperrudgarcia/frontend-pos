import { Button, CircularProgress, Container, Flex, Select, Text, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { InputForm } from '../../components/InputForm'
import { ImcPayload, postImc } from '../../services/imc'
import { getUserByTypeUser } from '../../services/users'
import { UsersTypes } from '../../utils/constants'
import { withAuth } from '../../utils/hoc/with-auth'

export type SelectOptionsUserType = {
  label: string
  value: number
}

const Imc = () => {
  const [formValues, setFormValues] = useState<ImcPayload>({} as ImcPayload)
  const toast = useToast()
  const [userPersonalOptions, setUserPersonalOptions] = useState<SelectOptionsUserType[]>([])
  const [userStudentOptions, setUserStudentOptions] = useState<SelectOptionsUserType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target

    setFormValues({ ...formValues, [name]: value })
  }
  console.log({ formValues })
  const handleSubmit = async () => {
    if (!formValues.height) return

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
      return
    }

    toast({
      position: 'top',
      description: "Usuário cadastrado com sucesso!",
      status: 'success',
      duration: 2000,
      isClosable: true,
    })

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
        </Flex>
        :
        <>
          <InputForm
            label='Altura'
            name="height"
            type="number"
            value={formValues.height || ''}
            placeholder="Ex: 1.68"
            errorMessage="A altura é obrigatória"
            isRequired
            onChange={handleInputChange}
          />

          <InputForm
            label='Peso em Kg'
            name="weight"
            type="number"
            value={formValues.weight || ''}
            placeholder="Digite seu peso"
            errorMessage="O peso é obrigatório"
            isRequired
            onChange={handleInputChange}
          />

          <Text fontSize={16} mb={4}>Aluno *</Text>
          <Select
            placeholder="Selecione o Aluno"
            errorBorderColor="O aluno é obrigatório"
            boxShadow='base'
            rounded='md'
            bg='white'
            isRequired
            name="id_student"
            onChange={handleInputChange}
            value={formValues.id_student || ''}
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
            name="id_professional"
            onChange={handleInputChange}
            value={formValues.id_professional || ''}
          >
            {userPersonalOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>


          <Flex alignItems="center" justifyContent="space-between" >
            <Text onClick={() => window?.history?.back()} cursor="pointer">
              Voltar
            </Text>
            <Button mt={4} onClick={handleSubmit} width={40} backgroundColor="yellow.500"> Calcular </Button>
          </Flex>
        </>
      }
    </Container>
  )
}

export default withAuth(Imc, [UsersTypes.ADMIN, UsersTypes.PERSONAL])
import { Button, CircularProgress, Container, Flex, Select, Text, useDisclosure, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { InputForm } from '../../components/InputForm'
import { ModalEx } from '../../components/modal'
import { useAuth } from '../../Providers/auth'
import { Imc, ImcPayload, postImc } from '../../services/imc'
import { getUserByTypeUser } from '../../services/users'
import { UsersTypes } from '../../utils/constants'
import { withAuth } from '../../utils/hoc/with-auth'

export type SelectOptionsUserType = {
  label: string
  value: number
}

const ImcCalc = () => {
  const toast = useToast()
  const { user: loggedUser } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [formValues, setFormValues] = useState<ImcPayload>({} as ImcPayload)
  const [userPersonalOptions, setUserPersonalOptions] = useState<SelectOptionsUserType[]>([])
  const [userStudentOptions, setUserStudentOptions] = useState<SelectOptionsUserType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imcData, setImcData] = useState<Imc | null>(null);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target

    setFormValues({ ...formValues, [name]: value })
  }
  const handleSubmit = async () => {
    if (!formValues.height || !formValues.weight || !formValues.id_student || !formValues.id_professional) {
      toast({
        position: 'top',
        title: 'Atenção!',
        description: 'Dados inválidos!',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
      return
    }
    setIsLoading(true)
    const { data, status, error } = await postImc(formValues)

    setIsLoading(false)
    if (status >= 400) {
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

    setImcData(data.data)
    onOpen()
    clearForm()
  }

  const clearForm = () => {
    setFormValues({})
  }

  const fetchUserStudent = async () => {
    setIsLoading(true)
    const { data } = await getUserByTypeUser({ type_user: UsersTypes.STUDENT })
    setUserStudentOptions(data.map(user => ({ value: user.id, label: user.nome })))
    setIsLoading(false)
  }

  const fetchUserByTypeUserPersonal = async () => {
    setIsLoading(true)
    const { data } = await getUserByTypeUser({ type_user: UsersTypes.PERSONAL })
    setUserPersonalOptions(data.map(user => ({ value: user.id, label: user.nome })))
    setIsLoading(false)
  }

  useEffect(() => {
    fetchUserStudent()
    fetchUserByTypeUserPersonal()
  }, [])

  return (
    <Container mt={50}>
      <Text mb="10" fontSize={40} color="purple">Calcular IMC </Text>

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

          <Text fontSize={16} my={4}>Profissional *</Text>
          <Select
            placeholder="Selecione o Profissional"
            errorBorderColor="O profissional é obrigatório"
            boxShadow='base'
            rounded='md'
            bg='white'
            isRequired
            name="id_professional"
            onChange={handleInputChange}
            value={(formValues.id_professional || '')}
            defaultValue={loggedUser.id}
          >
            {userPersonalOptions.filter(option => loggedUser.tipo_usuario === UsersTypes.PERSONAL ? option.value === loggedUser.id : option).map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>


          <Flex alignItems="center" justifyContent="space-between" mt={4}>
            <Text onClick={() => window?.history?.back()} cursor="pointer">
              Voltar
            </Text>
            <Button onClick={handleSubmit} width={40} backgroundColor="purple.300">Calcular</Button>
          </Flex>
        </>
      }

      <ModalEx isOpen={isOpen} onClose={onClose} title="Informações do Aluno(a)">
        <Flex flexDirection="column">
          <Flex><Text><strong>Aluno: </strong>{imcData?.aluno}</Text></Flex>
          <Flex><Text><strong>Profissional: </strong>{imcData?.personal}</Text></Flex>
          <Flex><Text><strong>Data: </strong>{imcData?.data}</Text></Flex>
          <Flex><Text><strong>IMC: </strong>{imcData?.imc}</Text></Flex>
          <Flex><Text><strong>Classificação: </strong>{imcData?.classificacao}</Text></Flex>
        </Flex>
      </ModalEx>
    </Container>
  )
}

export default withAuth(ImcCalc, [UsersTypes.ADMIN, UsersTypes.PERSONAL])
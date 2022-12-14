import { Button, Container, Flex, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { InputForm } from '../../components/InputForm'

// import { useState } from 'react'
// import { Imc } from '../../services/get-imc'

export const Imc = () => {
  // const [formValues, setFormValues] = useState<Imc>()

  const handleCalc = async () => {
    console.log('ok')
  }

  return (
    <Container mt={50}>
      <Text mb="10" fontSize={40} color="yellow.500">Calcular IMC </Text>

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


      <Flex alignItems="center" justifyContent="space-between" >
        <Link to="/home">
          Voltar
        </Link>
        <Button mt={4} onClick={handleCalc} width={40} backgroundColor="yellow.500"> Calcular </Button>
      </Flex>
    </Container>
  )
}

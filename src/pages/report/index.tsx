import { Box, Button, CircularProgress, Flex, Input, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getUserByTypeUser } from '../../services/users'
import { PDFOptions, UsersTypes } from '../../utils/constants'
import { SelectOptionsUserType } from '../imc'
import ReactToPdf from "react-to-pdf";
import { BiSearch } from 'react-icons/bi'
import { withAuth } from '../../utils/hoc/with-auth'

const ReportUser = () => {
    const { type } = useParams()

    const [userPersonalOptions, setUserPersonalOptions] = useState<SelectOptionsUserType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const ref = useRef<HTMLDivElement>(null);

    const fetchUsers = async (type: string) => {
        setIsLoading(true)

        const { data } = await getUserByTypeUser(type === 'student' ? UsersTypes.STUDENT : UsersTypes.PERSONAL)

        setUserPersonalOptions(data.map(user => ({ value: user.id, label: user.nome })))
        setIsLoading(false)
    }

    useEffect(() => {
        fetchUsers(type)
    }, [type])

    return (
        <Flex direction="column" alignItems="center" h="100vh" w="100vw" p="40px 80px">
            <Flex w="full" h="100px" alignItems="center" justifyContent="space-between"  >
                <Flex alignItems="center" >
                    <Button ><Link to="/reports/professionals">Profissionais</Link></Button>
                    <Button mx="30px"><Link to="/reports/student">Alunos</Link></Button>
                    <Button><Link to="/calc-imc">Calcular IMC</Link></Button>
                </Flex>

                <Flex flex={1} justifyContent="center" >
                    <Flex alignItems="center" mr="40px">
                        <Text>Filtrar:</Text>
                        <Input ml="8px" borderStartRadius="6px" borderEndRadius={0} border="1px solid black" type="text" placeholder="Ex: Matheus" />
                        <Button backgroundColor="white" borderStartRadius={0} borderEndRadius="6px" border="1px solid RGBA(0, 0, 0, 0.24)"><BiSearch size={30} /></Button>
                    </Flex>
                </Flex>

                <Button><Link to="/login">Sair</Link></Button>
            </Flex>

            <Box w="calc(100vw - 400px)" h="calc(100vh - 180px)">
                <Flex alignItems="center" justifyContent="space-between">
                    <Text mb="10" fontSize={40} color="purple">Relatório de {type === 'student' ? "Alunos" : "Profissionais"} </Text>
                    <Button><Link to={`/register/${type}`}>Cadastrar</Link></Button>
                </Flex>

                {isLoading ?
                    (
                        <Flex alignItems="center"  >
                            <Text>Aguardando carregamento...</Text>
                            <CircularProgress isIndeterminate color='blue.300' ml={10} />
                        </Flex>
                    )
                    :
                    (
                        <Box overflow="scroll" overflowX="hidden" maxH="calc(100vh - 340px)">
                            <TableContainer ref={ref}>
                                <Table variant='striped' colorScheme='purple'>
                                    <TableCaption> {`< Página 1 de 10 > `}</TableCaption>
                                    <Thead>
                                        <Tr>
                                            <Th>Nome</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {userPersonalOptions.map(option => (
                                            <Tr key={option.value}>
                                                <Td>{option.label}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )
                }

                <Flex alignItems="center" justifyContent="space-between" >
                    <Text onClick={() => window?.history?.back()} cursor="pointer">
                        Voltar
                    </Text>

                    <ReactToPdf targetRef={ref} filename="relatorio-user.pdf" options={PDFOptions} x={1} y={1} scale={0.9}>
                        {({ toPdf }) => (
                            <Button
                                mt={4}
                                width={40}
                                backgroundColor="purple.300"
                                onClick={toPdf}
                            >
                                Gerar PDF
                            </Button>
                        )}
                    </ReactToPdf>
                </Flex>
            </Box>
        </Flex >
    )
}

export default withAuth(ReportUser, [UsersTypes.ADMIN, UsersTypes.PERSONAL])
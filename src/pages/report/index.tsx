import { Box, Button, CircularProgress, Flex, Input, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useToast } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getUserByTypeUser, removeUser, User } from '../../services/users'
import { PDFOptions, UsersTypes } from '../../utils/constants'
import ReactToPdf from "react-to-pdf";
import { BiSearch } from 'react-icons/bi'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { withAuth } from '../../utils/hoc/with-auth'
import { useAuth } from '../../Providers/auth'

const ReportUser = () => {
    const { type } = useParams()
    const { signout } = useAuth()
    const navigate = useNavigate()
    const userStorage = localStorage.getItem("user");
    const user = JSON.parse(userStorage) as User;

    const toast = useToast({
        position: 'top',
        duration: 2000,
        isClosable: true,
    })

    const isPersonal = user.tipo_usuario == UsersTypes.PERSONAL

    const [usersList, setUsersList] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');


    const ref = useRef<HTMLDivElement>(null);

    const fetchUsers = async (type: string, name?: string) => {
        setIsLoading(true)

        const { data } = await getUserByTypeUser({ name, type_user: type === 'student' ? UsersTypes.STUDENT : UsersTypes.PERSONAL })

        setUsersList(data)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchUsers(type)
    }, [type])

    const handleRemoveUser = async (user: User) => {
        const { status } = await removeUser(user.id);

        if (status >= 400) {
            toast({
                title: 'Atenção!',
                description: "Não foi possivel remover o aluno(a)",
                status: 'error',
            })
            return
        }

        fetchUsers(type)
    }

    const handleEditUser = async (user: User) => {
        navigate(`/register/${type}-${user.id}`)
    }

    const handleFilterNameChange = () => {
        fetchUsers(type, search)
    }

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
                        <Input
                            ml="8px"
                            borderStartRadius="6px"
                            borderEndRadius={0}
                            border="1px solid black"
                            type="text"
                            placeholder="Ex: Aline"
                            value={search || ''}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button
                            backgroundColor="white"
                            borderStartRadius={0}
                            borderEndRadius="6px"
                            border="1px solid RGBA(0, 0, 0, 0.24)"
                            onClick={handleFilterNameChange}
                        ><BiSearch size={30} />
                        </Button>
                    </Flex>
                </Flex>

                <Button onClick={signout}>Sair</Button>
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
                                    <Thead>
                                        <Tr>
                                            <Th>Nome</Th>
                                            {isPersonal && type !== 'student' ? null : <Th isNumeric>Ações</Th>}
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {usersList?.map(user => (
                                            <Tr key={user.id}>
                                                <Td>{user.nome}</Td>
                                                {isPersonal && type !== 'student' ? null :
                                                    <Td isNumeric>
                                                        <Flex justifyContent="flex-end" gap={2}>
                                                            <Button onClick={() => handleEditUser(user)}><FiEdit size={24} /></Button>
                                                            <Button bg="red.500" onClick={() => handleRemoveUser(user)}><FiTrash2 size={24} color="white" /></Button>
                                                        </Flex>
                                                    </Td>
                                                }
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

                    <ReactToPdf targetRef={ref} filename="relatorio-user.pdf" options={PDFOptions} x={0.5} y={0.5} scale={0.7}>
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
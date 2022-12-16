import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ReactToPdf from "react-to-pdf";
import { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi"
import { PDFOptions, UsersTypes } from "../../utils/constants";
import { useParams } from "react-router-dom";
import { getUserById, User } from "../../services/users";
import { getImcByIduser, ImcList } from "../../services/imc";
import { useAuth } from "../../Providers/auth";
import { withAuth } from "../../utils/hoc/with-auth";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">{label}</p>
                <p className="label">IMC: {payload[0].value}</p>
                <p className="intro">{payload[0].payload.classificacao}</p>
            </div>
        );
    }

    return null;
};

const FollowUp = () => {
    console.log('entrou aki')
    const { iduser } = useParams()
    const { user: loggedUser } = useAuth()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [dataImcs, setDataImcs] = useState<ImcList[]>([])
    const [user, setUser] = useState<User>({} as User)

    const ref = useRef<HTMLDivElement>(null);


    const fetchUser = async (iduser: number) => {
        setIsLoading(true)

        const { data } = await getUserById(iduser)

        setUser(data)
        fetchImcs(iduser)
    }

    const fetchImcs = async (iduser: number) => {
        setIsLoading(true)

        const data = await getImcByIduser(iduser)

        setDataImcs(data)
        setIsLoading(false)
    }

    useEffect(() => {
        if (iduser && iduser !== '0') {
            fetchUser(Number(iduser))
            return
        }

        setUser(loggedUser)
        fetchImcs(loggedUser.id)
    }, [iduser])


    return (
        <Box h="100vh" w="100vw" p="40px 80px">
            <Flex w="full" h="100px" alignItems="center" justifyContent="space-between"  >
                <Flex alignItems="center" >
                    <Heading>
                        {user.nome}
                    </Heading>
                    <Button mx="30px">Alterar</Button>
                    <Button>Excluir</Button>
                </Flex>

                <Flex flex={1} justifyContent="center" >
                    <Flex alignItems="center" mr="40px">
                        <Text>Filtrar:</Text>
                        <Input ml="8px" borderStartRadius="6px" borderEndRadius={0} border="1px solid black" type="date" />
                        <Button backgroundColor="white" borderStartRadius={0} borderEndRadius="6px" border="1px solid RGBA(0, 0, 0, 0.24)"><BiSearch size={30} /></Button>
                    </Flex>


                    <ReactToPdf targetRef={ref} filename="relatorio-user.pdf" options={PDFOptions} x={1} y={1} scale={0.7}>
                        {({ toPdf }) => <Button onClick={toPdf}>Imprimir</Button>}
                    </ReactToPdf>
                </Flex>
                <Button>Sair</Button>
            </Flex>
            <Flex h="calc(100vh - 180px)" ref={ref}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={dataImcs}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="dataAvalicao" />
                        <YAxis dataKey="imc" />
                        {/* @ts-ignore */}
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="imc" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </Flex>
        </Box>
    );
}

export default withAuth(FollowUp, [UsersTypes.ALL])
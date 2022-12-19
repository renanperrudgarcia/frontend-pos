import { Box, Button, CircularProgress, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ReactToPdf from "react-to-pdf";
import { useEffect, useRef, useState } from "react";
import { PDFOptions, UsersTypes } from "../../utils/constants";
import { User } from "../../services/users";
import { getImcByIduser, ImcListResponse } from "../../services/imc";
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

    const { signout } = useAuth()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [dataImcs, setDataImcs] = useState<ImcListResponse[]>([])
    const [user, setUser] = useState<User>({} as User)
    const [dataInicio, setDataInicio] = useState('')
    const handleDataInicioChange = (event) => setDataInicio(event.target.value)

    const ref = useRef<HTMLDivElement>(null);

    const fetchUser = async () => {
        const user = localStorage.getItem("user");
        const userData = JSON.parse(user);
        const data = dataInicio !== '0' ? dataInicio : '0';
        fetchImcs(userData.id, data)
    }

    const fetchImcs = async (id: number, data_avalicao: string) => {
        setIsLoading(true)

        const data = await getImcByIduser(id, data_avalicao)

        setDataImcs(data)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchUser()
    }, [dataInicio])


    return (
        <Box h="100vh" w="100vw" p="40px 80px">
            <Flex w="full" h="100px" alignItems="center" justifyContent="space-between"  >
                <Flex alignItems="center" >
                    <Heading>
                        {user.nome}
                    </Heading>
                </Flex>

                <Flex flex={1} justifyContent="center" >
                    <Flex alignItems="center" mr="40px">
                        <Text>Filtrar:</Text>
                        <Input ml="8px" borderStartRadius="6px" borderEndRadius={0} border="1px solid black" type="date" onChange={handleDataInicioChange} />
                    </Flex>


                    <ReactToPdf targetRef={ref} filename="relatorio-user.pdf" options={PDFOptions} x={1} y={1} scale={0.7}>
                        {({ toPdf }) => <Button onClick={toPdf}>Imprimir</Button>}
                    </ReactToPdf>
                </Flex>
                <Button onClick={signout}>Sair</Button>
            </Flex>
            {isLoading ?
                <Flex alignItems="center"  >
                    <Text>Aguardando carregamento...</Text>
                    <CircularProgress isIndeterminate color='blue.300' ml={10} />
                </Flex> :
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
                </Flex>}
        </Box>
    );
}

export default withAuth(FollowUp, [UsersTypes.ALL])
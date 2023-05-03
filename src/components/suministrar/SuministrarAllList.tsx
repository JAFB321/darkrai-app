import React, { useState } from "react";
import { IResourceComponentsProps, useApiUrl, useCustom, useGetIdentity, useMany } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import {
    List,
    usePagination,
    DateField,
    BooleanField,
    TextField,
} from "@refinedev/chakra-ui";
import {
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    HStack,
    Button,
    IconButton,
    Box,
    Card,
    Heading,
    CardHeader,
    CardBody,
    SimpleGrid,
    Badge,
    Text,
} from "@chakra-ui/react";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons";
import { formatDateTime, formatTime } from "src/utils/dates";
import { Dosis, User } from "src/types";

export const SuministrarAllList: React.FC<IResourceComponentsProps> = () => {
 
    const apiUrl = useApiUrl();
    const { data: user } = useGetIdentity<User>();
    const isAdmin = user?.rol === 'admin'
    
    const { data: dosisData, refetch: refetchDosis } = useMany<Dosis>({
        resource: "suministrar/all",
        ids: [],
    });

    const dosis = dosisData?.data

    const [selectedDosisId, setSelectedDosisId] = useState<number | null>(null)    
    const { refetch: fetchDispensar, isFetched: isFetchedDispensar } = useCustom({
        url: `${apiUrl}/esp/dosis/${selectedDosisId}/dispensar`,
        method: 'post',
        config: {
            payload: {
                enfermeroId: user?.enfermero?.id,
                isAdmin
            }
        },
        queryOptions: {
            enabled: false,
            retry: false
        },
        successNotification(data, values, resource) {
            setSelectedDosisId(null)
            refetchDosis()
            return {
                message: 'Pastilla dispensada correctamente',
                type: 'success',
            }
        },
        errorNotification(error, values, resource) {
            setSelectedDosisId(null)
            return {
                message: error?.message || 'Ocurrio un error',
                type: 'error',
            }
        },
    })
    
    const dispensarDosis = (dosisId: number) => {
        setSelectedDosisId(dosisId)
        setTimeout(() => {
            fetchDispensar()
        }, 100);
    }

    return (
        <List title='Suministrar dosis proximas'>
           
           {dosis?.map(({id, fecha, cantidad, planMedicacion}) => {
                const tratamiento = planMedicacion?.tratamiento
                const medicamento = planMedicacion?.medicamento
                const paciente = tratamiento?.paciente
                
            return <>
            <SimpleGrid columns={[1]} spacing={5} mt={4} maxW={500}>
                <Card >
                    <CardHeader height={35}>
                        <Heading size="sm" mb={2}>
                            {paciente?.nombre} {'           '}
                        {
                            new Date(fecha) < new Date() 
                            ? <Badge float={['none', 'right', 'right']} size='lg' colorScheme="yellow">Atrasado</Badge> 
                            : ''
                        }
                        </Heading>
                        

                    </CardHeader>

                    <CardBody mt={5}>
                        <Text>
                            Suministrar <Badge size='lg' colorScheme="green">{cantidad}</Badge> {medicamento?.nombre} de {medicamento?.concentrado} mg
                        </Text>
                        <Text>  
                            A las {formatTime(fecha)}
                        </Text>

                        <Button disabled={!!selectedDosisId} onClick={() => id && dispensarDosis(id)} mt={5}>
                            Suministrar
                        </Button>

                    </CardBody>

                
                </Card>
            </SimpleGrid>
            </>
           })}

        </List>
    );
};

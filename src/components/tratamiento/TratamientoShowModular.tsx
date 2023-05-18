import { useShow, useOne, useMany } from "@refinedev/core";
import { Show, NumberField, TagField, TextField, EditButton, ShowButton } from "@refinedev/chakra-ui";
import { Badge, BreadcrumbSeparator, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Heading, Highlight, HStack, Progress, SimpleGrid, Stack, Text, VStack } from "@chakra-ui/react";
import { Paciente, PlanMedicacion, Tratamiento } from "src/types";
import { formatDate } from "src/utils/dates";
import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "src/context/authContext";

export const TratamientoShowModular = ({tratamientoId}: {tratamientoId: string}) => {

    const { isAdmin } = useContext(AuthContext) 

    const router = useRouter()
    const { queryResult } = useShow<Tratamiento>({
        resource: 'tratamiento',
        id: tratamientoId
    });
    const { data, isLoading } = queryResult;

    const tratamientoData = data?.data;

    const { data: pacienteData, isLoading: pacienteIsLoading } = useOne<Paciente>({
        resource: "paciente",
        id: tratamientoData?.pacienteId || "",
        queryOptions: {
            enabled: !!tratamientoData,
        },
    });

    const { data: planesMedicacionData } = useMany<PlanMedicacion>({
        ids: tratamientoData?.planesMedicacion?.map(({ id }) => id) || [],
        resource: 'plan-medicacion',
        meta: {
            params: {
                tratamientoId: tratamientoData?.id
            }
        }
    })

    const planes = planesMedicacionData?.data
    const planesElement = <>
        <SimpleGrid columns={[1, 1, 2]} spacing={5} mt={4}>
            {planes?.map(({ activo, medicamento, dosis, fechaInicio, fechaFin, cantidadTotal, id: planId, progresoDosis }) =>
                <Card variant={'outline'}>
                    <CardHeader>
                        <Heading size="sm" mb={2}>
                            {medicamento?.nombre} de {medicamento?.concentrado} mg
                        {
                            activo 
                            ? <Badge float={'right'} colorScheme='green'>Activo</Badge> 
                            : <Badge float={'right'} colorScheme='yellow'>Finalizado</Badge>
                        }
                        </Heading>
                        {formatDate(fechaInicio)} hasta el {formatDate(fechaFin)}

                    </CardHeader>

                    <CardBody>
                        <Progress 
                            value={progresoDosis+1}
                            />
                        <Text mt={1}>
                            {progresoDosis.toFixed(0)}% de dosis suministradas 
                        </Text>
                        
                    </CardBody>

                    <CardFooter>
                        <ButtonGroup spacing='2'>
                            <ShowButton
                                colorScheme="gray"
                                {...(isLoading ? { disabled: true } : {})}
                                resource='plan-medicacion'
                                recordItemId={planId}
                            >
                                Administrar
                            </ShowButton>

                        </ButtonGroup>
                    </CardFooter>
                       
                </Card>
            )}
        </SimpleGrid>
    </>

    return (
        <>
            <Show 
                wrapperProps={{mt:4, pt:10}}
                title={tratamientoData?.nombre}  
                isLoading={isLoading}
                headerButtons={isAdmin ?
                    <ButtonGroup display={'block'} mt={5}>
                        <Button colorScheme="green" onClick={() => router.push('/plan-medicaciones/create?tratamientoId='+tratamientoData?.id)}>
                            Crear nuevo Plan de medicacion
                        </Button>
                    </ButtonGroup> : <></>
                } 
                breadcrumb={false}
                goBack={false}
                >
                
            </Show>

            {
                planes?.length ? planesElement : ''
            }
        </>
    );
};

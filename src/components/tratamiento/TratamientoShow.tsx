import { useShow, useOne, useMany } from "@refinedev/core";
import { Show, NumberField, TagField, TextField, EditButton, ShowButton } from "@refinedev/chakra-ui";
import { Badge, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Heading, Highlight, HStack, Progress, SimpleGrid, Stack, Text, VStack } from "@chakra-ui/react";
import { Paciente, PlanMedicacion, Tratamiento } from "src/types";
import { formatDate } from "src/utils/dates";
import { useRouter } from "next/router";

export const TratamientoShow = () => {
    const router = useRouter()
    const { queryResult } = useShow<Tratamiento>();
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
        <Heading as="h5" size="md" mt={4} mb={4}>
            Planes de medicacion del tratamiento
        </Heading>

        <SimpleGrid columns={[1, 1, 2]} spacing={5}>
            {planes?.map(({ activo, medicamento, dosis, fechaInicio, fechaFin, cantidadTotal, id: planId, progresoDosis }) =>
                <Card >
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
                            {progresoDosis}% de dosis suministradas 
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
            <Show title="Ver tratamiento" isLoading={isLoading}>
                <Heading as="h5" size="sm" mt={4}>
                    Id
                </Heading>
                <NumberField value={tratamientoData?.id ?? ""} />
                <Heading as="h5" size="sm" mt={4}>
                    Nombre
                </Heading>
                <TextField value={tratamientoData?.nombre} />
                <Heading as="h5" size="sm" mt={4}>
                    Paciente
                </Heading>
                {pacienteIsLoading ? <>Loading...</> : <>{pacienteData?.data.nombre}</>}

            <ButtonGroup display={'block'} mt={5}>
                <Button colorScheme="green" onClick={() => router.push('/plan-medicaciones/create?tratamientoId='+tratamientoData?.id)}>
                    Crear nuevo Plan de medicacion
                </Button>
            </ButtonGroup>
            </Show>


            {
                planes?.length ? planesElement : ''
            }
        </>
    );
};

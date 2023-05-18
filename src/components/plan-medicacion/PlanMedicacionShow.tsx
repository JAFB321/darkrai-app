import { useShow, useOne, useCustom, useApiUrl } from "@refinedev/core";
import {
    Show,
} from "@refinedev/chakra-ui";
import { Badge, Box, Button, Card, CardBody, CardHeader, Heading, Highlight, HStack, Progress, SimpleGrid, Text } from "@chakra-ui/react";
import { Medicamento, PlanMedicacion, Tratamiento } from "src/types";
import { formatDate, formatDateTime } from "src/utils/dates";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const PlanMedicacionShow = () => {
    const { queryResult } = useShow<PlanMedicacion>({
        meta: {
            params: {
                includeDosis: 'true'
            }
        }
    });
    const { data, isLoading } = queryResult;
    const apiUrl = useApiUrl();
    const router = useRouter();

    const planMedicacionData = data?.data;
    const dosisData = planMedicacionData?.dosis || []

    const { data: tratamientoData, isLoading: tratamientoIsLoading } = useOne<Tratamiento>({
        resource: "tratamiento",
        id: planMedicacionData?.tratamientoId || "",
        queryOptions: {
            enabled: !!planMedicacionData,
        },
        meta: {
            params: {
                includePaciente: 'true'
            }
        }
    });

    const { data: medicamentoData, isLoading: medicamentoIsLoading } = useOne<Medicamento>({
        resource: "medicamento",
        id: planMedicacionData?.medicamentoId || "",
        queryOptions: {
            enabled: !!planMedicacionData,
        },
    });

    const { refetch, isFetched } = useCustom({
        url: `${apiUrl}/plan-medicacion/${planMedicacionData?.id}/end`,
        method: 'post',
        queryOptions: {
            enabled: false
        },
    })

    useEffect(() => {
      if(isFetched) router.refresh()
    }, [isFetched])
    

    const handleEndPlanMedicacion = () => {
        refetch()
    }

    const dosisElement = <>
        <Heading as="h5" size="md" mt={4} mb={4}>
         {planMedicacionData?.progresoDosis.toFixed(0) || 0}% de dosis suministradas
        </Heading>

        <Progress 
            value={planMedicacionData?.progresoDosis || 0}
            hasStripe
            colorScheme="teal"
            isIndeterminate={planMedicacionData?.progresoDosis === undefined}
        />

        <SimpleGrid columns={[1, 2, 4]} spacing={5} mt={4}>
            {dosisData?.map((dosis, i) => (
                <Card size={['md', 'md', 'sm']} key={i} >
                <CardHeader height={35}>
                    <Heading size="sm" mb={2}>
                        {formatDateTime(dosis.fecha || '')}
                    </Heading>
                    
                </CardHeader>

                <CardBody>
                    {
                        dosis.suministrado
                        ? 
                        <>
                        <Badge colorScheme='green'>Suministrada</Badge> 
                        <Text mt={1}>Por {dosis.enfermeroSuministracion?.nombre}</Text>
                        </>
                        : <Badge colorScheme='yellow'>Pendiente</Badge> 
                    }
                </CardBody>

               
            </Card>
            ))}
        </SimpleGrid>
    </>

    return (
        <>
        <Show title={tratamientoData?.data.nombre}
         isLoading={isLoading}
         headerButtons={({ defaultButtons }) => (
            <Box
                display="flex"
                flexWrap="wrap"
                justifyContent={{ base: "center", md: "flex-end" }}
                gap="2"
            >
                <Button 
                colorScheme="red"
                onClick={() => handleEndPlanMedicacion()}
                isDisabled={!planMedicacionData?.activo}
                >
                    Finalizar plan de medicacion
                </Button>
            </Box>
        )
        }
         >
            <Heading as="h5" size="sm" mt={4}>
                Paciente
            </Heading>
            {tratamientoIsLoading ? (
                <>Loading...</>
            ) : (
                <>{tratamientoData?.data.paciente?.nombre}</>
            )}
            <Heading as="h5" size="sm" mt={4}>
                Medicamento
            </Heading>
            {medicamentoIsLoading ? (
                <>Loading...</>
            ) : (
                <>{medicamentoData?.data.nombre} de {medicamentoData?.data.concentrado} mg</>
            )}
            <Heading as="h5" size="sm" mt={4} mb={2}>
                Cantidad
            </Heading>

            <Highlight
                query={[planMedicacionData?.cantidadDosis+'', planMedicacionData?.intervaloHoras+'']}
                styles={{ px: '2', py: '1', rounded: 'full', bg: 'teal.100' }}
            >
                {`${planMedicacionData?.cantidadDosis} pastilla${Number(planMedicacionData?.cantidadDosis )> 1 ? 's':''} cada ${planMedicacionData?.intervaloHoras+''} hora(s).`}
            </Highlight>
            {' '}
            <Highlight
                query={[planMedicacionData?.dosis?.length+'']}
                styles={{ px: '2', py: '1', rounded: 'full', bg: 'blue.100' }}
            >
                {`${planMedicacionData?.dosis?.length} dosis en total`}
            </Highlight>

            <Heading as="h5" size="sm" mt={4}>
                Fecha Inicio
            </Heading>
            {formatDate(planMedicacionData?.fechaInicio || '')}

            <Heading as="h5" size="sm" mt={4}>
                Fecha Fin
            </Heading>
            {formatDate(planMedicacionData?.fechaFin || '')}

            <Heading as="h5" size="sm" mt={4}>
                Estado
            </Heading> 
            {
                planMedicacionData?.activo 
                ? <Badge colorScheme='green'>Activo</Badge> 
                : <Badge colorScheme='yellow'>Finalizado</Badge>
            }
            
        </Show>

        {dosisElement}

        </>
        
    );
};

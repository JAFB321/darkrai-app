import { useShow, useOne, useApiUrl, useCustom } from "@refinedev/core";
import { Show, NumberField, TagField } from "@refinedev/chakra-ui";
import { Button, ButtonGroup, Card, CardBody, CardHeader, Heading, HStack, Progress, Text, useQuery } from "@chakra-ui/react";
import { Medicamento } from "src/types";
import { Contenedor } from "src/types/Contenedor";
import { useState } from "react";

export const ContenedorShow = () => {
    const { queryResult } = useShow<Contenedor>();
    const { data, isLoading, refetch: refetchContenedor } = queryResult;
    const apiUrl = useApiUrl();


    const contenedor = data?.data;
    const medicamento = contenedor?.medicamento         

    const [cadenaMovimientoQuery, setCadenaMovimientoQuery] = useState({direction: 'x', all: false})    
    const { refetch: fetchMoverCadena, isFetched: isFetchedMoverCadena } = useCustom({
        url: `${apiUrl}/esp/contenedor/${contenedor?.id}/move`,
        method: 'post',
        config: {
            payload: cadenaMovimientoQuery
        },
        queryOptions: {
            enabled: false,
            retry: false
        },
        successNotification(data, values, resource) {
            refetchContenedor()
            console.log(data);
            setCadenaMovimientoQuery({direction: 'x', all: false})
            return {
                message: 'Movimiento exitoso',
                type: 'success',
            }
        },
        errorNotification(error, values, resource) {
            setCadenaMovimientoQuery({direction: 'x', all: false})
            return {
                message: error?.message || 'Ocurrio un error',
                type: 'error',
            }
        },
    })
    
    const moverCadena = (payload: {direction: 'up' | 'down', all: boolean}) => {
        setCadenaMovimientoQuery(payload)
        setTimeout(() => {
            fetchMoverCadena()
        }, 100)
    }

    const handleSubirCadena = () => {
        moverCadena({
            direction: 'up',
            all: false
        })
    }

    const handleBajarCadena = () => {
        moverCadena({
            direction: 'down',
            all: false
        })
    }

    const handleSubirCadenaTodo = () => {
        moverCadena({
            direction: 'up',
            all: true
        })
    }

    const handleBajarCadenaTodo = () => {
        moverCadena({
            direction: 'down',
            all: true
        })
    }


    return (
        <>
            <Show title={`Contenedor ${contenedor?.motor}`} isLoading={isLoading}>
                <Heading as="h5" size="sm" mt={4}>
                    Paso Actual
                </Heading>
                <NumberField value={contenedor?.pasoActual ?? ""} />
                <Heading as="h5" size="sm" mt={4}>
                    Medicamento
                </Heading>
                {!medicamento ? (
                    <>Sin medicamento</>
                ) : (
                    <>{medicamento?.nombre} de {medicamento?.concentrado} mg</>
                )}
            </Show>
            <Card mt={5}>
                <CardHeader>
                    <Heading size={'md'} height={5}>
                        Mover motores
                    </Heading>
                </CardHeader>

                <CardBody>
                    <Progress 
                        value={((Number(contenedor?.pasoActual)) / Number(contenedor?.pasosTotal)*100)+1} 
                    />
                    <Text mt={2}>
                        {Number(contenedor?.pasoActual)} de {contenedor?.pasosTotal} pastillas dispensadas
                    </Text>

                    <ButtonGroup mt={5} isDisabled={cadenaMovimientoQuery.direction!=='x'}>
                        <Button onClick={() => handleSubirCadena()} colorScheme="linkedin">Subir cadena</Button>
                        <Button onClick={() => handleSubirCadenaTodo()} colorScheme="linkedin">Subir toda la cadena</Button>
                    </ButtonGroup>

                    <ButtonGroup mt={5} display={'block'} isDisabled={cadenaMovimientoQuery.direction!=='x'}>
                        <Button onClick={() => handleBajarCadena()} colorScheme="orange">Bajar cadena</Button>
                        <Button onClick={() => handleBajarCadenaTodo()} colorScheme="orange">Bajar toda la cadena</Button>
                    </ButtonGroup>
                </CardBody>
            </Card>
        </>
    );
};

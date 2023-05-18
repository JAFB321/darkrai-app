import { Button, ButtonGroup, Card, CardBody, CardHeader, Heading, Input } from "@chakra-ui/react";
import { useApiUrl, useCustom, useShow } from "@refinedev/core";
import { useState } from "react";
import { Contenedor } from "src/types/Contenedor";

export const ContenedorManual = () => {

    const [pasos, setPasos] = useState(50)

    const { queryResult } = useShow<Contenedor>();
    const { data, isLoading, refetch: refetchContenedor } = queryResult;
    const apiUrl = useApiUrl();

    const contenedor = data?.data;

    const [cadenaMovimientoQuery, setCadenaMovimientoQuery] = useState({
        action: "MOVER_ATRAS",
        motor: 1,
        cantidad: 1,
        PASOS: 0,
    })    
    const { refetch: fetchMoverCadena } = useCustom({
        url: `${apiUrl}/esp/action`,
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
            setCadenaMovimientoQuery({
                action: "MOVER_ATRAS",
                motor: 1,
                cantidad: 1,
                PASOS: 0,
            })
            return {
                message: 'Movimiento exitoso',
                type: 'success',
            }
        },
        errorNotification(error, values, resource) {
            setCadenaMovimientoQuery({
                action: "MOVER_ATRAS",
                motor: 1,
                cantidad: 1,
                PASOS: 0,
            })
            return {
                message: error?.message || 'Ocurrio un error',
                type: 'error',
            }
        },
    })

    const moverCadenaArriba = () => {
        if(!contenedor?.motor) return 

        setCadenaMovimientoQuery({
            action: "MOVER_ADELANTE",
            cantidad: 1,
            motor: contenedor.motor,
            PASOS: pasos,
        })
        setTimeout(() => {
            fetchMoverCadena()
        }, 100)
    }

    const moverCadenaAbajo = () => {
        if(!contenedor?.motor) return 

        setCadenaMovimientoQuery({
            action: "MOVER_ATRAS",
            cantidad: 1,
            motor: contenedor.motor,
            PASOS: pasos,
        })
        setTimeout(() => {
            fetchMoverCadena()
        }, 100)
    }

  return (
    <Card mt={5}>
        <CardHeader>
            <Heading size={'md'}>Mover motor manual</Heading>
        </CardHeader>

        <CardBody>
            <Input value={pasos} onChange={(val) => setPasos(+val.currentTarget.value || 0)}></Input>
            <ButtonGroup mt={5}>
                <Button onClick={() => {moverCadenaArriba()}} colorScheme="blue" mr={3}>Subir</Button>
                <Button onClick={() => {moverCadenaAbajo()}} colorScheme="orange">Bajar</Button>
            </ButtonGroup>
        </CardBody>
    </Card>
  )
}

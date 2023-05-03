import React from "react";
import { IResourceComponentsProps, useMany } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import {
    List,
    usePagination,
    EditButton,
    ShowButton,
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
    SimpleGrid,
    Card,
    CardHeader,
    Heading,
    CardBody,
    Text,
    Badge,
} from "@chakra-ui/react";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons";
import { Contenedor } from "src/types/Contenedor";

export const ContenedorList: React.FC<IResourceComponentsProps> = () => {
    const { data: contenedorData } = useMany<Contenedor>({
        resource: "contenedor",
        ids: [],
        queryOptions: {
            
        },
    });

    const contenedores = contenedorData?.data
    
    return (
        <List title="Contenedores">
            <SimpleGrid columns={[1, 1, 3]} spacing={5} mt={4} >
            {
                contenedores?.map(({id, motor, pasoActual, medicamento}) => {
                    return <>
                    <Card >
                        <CardHeader height={35}>
                            <Heading size="sm" mb={2}>
                            Contenedor {motor}
                            </Heading>
                        </CardHeader>

                        <CardBody>
                            <Text>
                                {medicamento 
                                ? <>Con {medicamento?.nombre} de {medicamento.concentrado} mg</>
                                : <><Badge colorScheme="yellow">Sin medicamento</Badge></>
                                }
                                
                            </Text>
                            <Text>  
                                
                            </Text>

                            <ShowButton 
                                mt={5}
                                recordItemId={id}
                            >
                                Administrar
                            </ShowButton>

                        </CardBody>

                    
                    </Card>
                    </>
                })
            }
            </SimpleGrid>
        
        </List>
    );
};

import { useShow, useMany } from "@refinedev/core";
import { Show, NumberField, TagField, TextField } from "@refinedev/chakra-ui";
import { Heading, Stack, Button, ButtonGroup, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Paciente, Tratamiento } from "src/types";
import { TratamientoShowModular } from "@components/tratamiento/TratamientoShowModular";

export const PacienteShow = () => {
    const { queryResult } = useShow<Paciente>();
    const { data, isLoading } = queryResult;
    const router = useRouter()

    const record = data?.data;

    const { data: tratamientosData, isLoading: tratamientosIsLoading } =
        useMany<Tratamiento>({
            resource: "tratamiento",
            ids: [],
            meta: {
                params: { pacienteId: record?.id } // hotfix
            },
            queryOptions: {
                enabled: !!record,
            },
        });

    const tratamientos = tratamientosData?.data
    const tratamientosText = tratamientos?.map(({ nombre }) => nombre).join(', ')

    return (
        <> 
            <Show
                isLoading={isLoading}
                headerButtons={({ defaultButtons }) => (
                    <Box
                        display="flex"
                        flexWrap="wrap"
                        justifyContent={{ base: "center", md: "flex-end" }}
                        gap="2"
                    >
                        {/* <Button colorScheme="blue" onClick={() => router.push('/tratamientos?pacienteId=' + record?.id)}>Tratamientos</Button> */}
                        {defaultButtons}
                    </Box>
                )
                }
            >
                <Heading as="h5" size="sm" mt={4}>
                    Id
                </Heading>
                <NumberField value={record?.id ?? ""} />

                <Heading as="h5" size="sm" mt={4}>
                    Nombre
                </Heading>
                <TextField value={record?.nombre} />

                <Heading as="h5" size="sm" mt={4}>
                    Edad
                </Heading>
                <TextField value={record?.edad && (record.edad+ ' años')} />

                <Heading as="h5" size="sm" mt={4}>
                    Genero
                </Heading>
                <TextField value={record?.genero}/>

                <Heading as="h5" size="sm" mt={4}>
                    Peso
                </Heading>
                <TextField value={record?.peso && (record?.peso + ' Kg')}/>

                <Heading as="h5" size="sm" mt={4}>
                    Altura
                </Heading>
                <TextField value={record?.altura && (record?.altura + ' metros')}/>

                <Heading as="h5" size="sm" mt={4}>
                    Contacto de emergencia
                </Heading>
                <TextField value={record?.contactoEmergencia || 'Sin contacto de emergencia'}/>

                <Heading as="h5" size="sm" mt={4}>
                    Numero de seguridad social
                </Heading>
                <TextField value={record?.noSeguridadSocial || 'Sin numero de seguridad social'}/>

                <Heading as="h5" size="sm" mt={4}>
                    Tratamientos
                </Heading>
                {tratamientosText || 'Sin tratamientos'}

            </Show >

            {tratamientos?.map((tratamiento) => <TratamientoShowModular tratamientoId={tratamiento.id+''} />)}
            

        </>
    );
};

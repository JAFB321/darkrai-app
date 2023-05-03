import { useShow, useMany } from "@refinedev/core";
import { Show, NumberField, TagField, TextField } from "@refinedev/chakra-ui";
import { Heading, Stack, Button, ButtonGroup, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Paciente, Tratamiento } from "src/types";

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

    const tratamientosText = tratamientosData?.data.map(({ nombre }) => nombre).join(', ')

    return (
        <Show
            isLoading={isLoading}
            headerButtons={({ defaultButtons }) => (
                <Box
                    display="flex"
                    flexWrap="wrap"
                    justifyContent={{ base: "center", md: "flex-end" }}
                    gap="2"
                >
                    <Button colorScheme="blue" onClick={() => router.push('/tratamientos?pacienteId=' + record?.id)}>Tratamientos</Button>
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
                Tratamientos
            </Heading>
            {tratamientosText || 'Sin tratamientos'}
        </Show >
    );
};

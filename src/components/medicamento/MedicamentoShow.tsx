import { useShow } from "@refinedev/core";
import { Show, NumberField, TagField, TextField } from "@refinedev/chakra-ui";
import { Heading, HStack } from "@chakra-ui/react";

export const MedicamentoShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show title='Ver medicamento' isLoading={isLoading}>
            <Heading as="h5" size="sm" mt={4}>
                Id
            </Heading>
            <NumberField value={record?.id ?? ""} />
            <Heading as="h5" size="sm" mt={4}>
                Nombre
            </Heading>
            <TextField value={record?.nombre} />
            <Heading as="h5" size="sm" mt={4}>
                Concentrado
            </Heading>
            <NumberField value={record?.concentrado ?? ""} />
        </Show>
    );
};

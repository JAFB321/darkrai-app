import { useShow } from "@refinedev/core";
import { Show, NumberField, TagField, TextField } from "@refinedev/chakra-ui";
import { Heading, HStack } from "@chakra-ui/react";
import { Medicamento } from "src/types";
import { formatDate, formatDateMonthYear } from "src/utils/dates";

export const MedicamentoShow = () => {
    const { queryResult } = useShow<Medicamento>();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show title='Ver medicamento' isLoading={isLoading}>
            <Heading as="h5" size="sm" mt={4}>
                Id
            </Heading>
            <NumberField value={record?.id ?? ""} />

            <Heading as="h5" size="sm" mt={4}>
                Sustancia activa
            </Heading>
            <TextField value={record?.nombre} />

            <Heading as="h5" size="sm" mt={4}>
                Lote
            </Heading>
            <TextField value={record?.lote || 'Sin lote'} />

            <Heading as="h5" size="sm" mt={4}>
                Fecha de caducidad
            </Heading>
            <TextField value={record?.caducidad ? formatDateMonthYear(record?.caducidad) : 'Sin fecha'} />

            <Heading as="h5" size="sm" mt={4}>
                Concentrado
            </Heading>
            <NumberField value={(record?.concentrado && record.concentrado + ' mg') || ''} />

        </Show>
    );
};

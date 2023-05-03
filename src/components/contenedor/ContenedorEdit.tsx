import React from "react";
import { Edit } from "@refinedev/chakra-ui";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Select,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";
import { useMany, useSelect } from "@refinedev/core";
import { Medicamento } from "src/types";

export const ContenedorEdit = () => {
    const {
        refineCore: { formLoading, queryResult },
        saveButtonProps,
        register,
        resetField,
        formState: { errors },
    } = useForm();

    const contenedoresData = queryResult?.data?.data;

    // React.useEffect(() => {
    //     resetField("medicamentoId");
    // }, [medicamentoOptions]);

    const { data: medicamentoData } = useMany<Medicamento>({
        resource: "medicamento",
        ids: [],
    })

    const medicamentos = medicamentoData?.data

    return (
        <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <FormControl mb="3" isInvalid={!!(errors as any)?.id}>
                <FormLabel>Id</FormLabel>
                <Input
                    disabled
                    type="number"
                    {...register("id", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.id?.message as string}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.medicamentoId}>
                <FormLabel>Medicamento</FormLabel>
                <Select
                    placeholder="Select medicamento"
                    {...register("medicamentoId", {
                        required: "This field is required",
                    })}
                >
                    {medicamentos?.map((medicamento) => (
                        <option value={medicamento.id} key={medicamento.id}>
                            {medicamento.nombre} {medicamento.concentrado} mg
                        </option>
                    ))}
                </Select>
                <FormErrorMessage>
                    {(errors as any)?.medicamentoId?.message as string}
                </FormErrorMessage>
            </FormControl>
        </Edit>
    );
};

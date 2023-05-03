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
import { useOne, useSelect } from "@refinedev/core";
import { Paciente } from "src/types";

export const TratamientoEdit = () => {
    const {
        refineCore: { formLoading, queryResult },
        saveButtonProps,
        register,
        resetField,
        formState: { errors },
    } = useForm();

    const tratamientoData = queryResult?.data?.data;

    const { data: dataPaciente } = useOne<Paciente>({
        resource: "paciente",
        id: tratamientoData?.pacienteId,
    });

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
            <FormControl mb="3" isInvalid={!!(errors as any)?.nombre}>
                <FormLabel>Nombre</FormLabel>
                <Input
                    type="text"
                    {...register("nombre", {
                        required: "This field is required",
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.nombre?.message as string}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.pacienteId} >
                <FormLabel>Paciente</FormLabel>
                <Input
                    type="text"
                    disabled={true}
                    defaultValue={dataPaciente?.data.nombre}
                />

                <FormErrorMessage>
                    {(errors as any)?.pacienteId?.message as string}
                </FormErrorMessage>
            </FormControl>
        </Edit >
    );
};

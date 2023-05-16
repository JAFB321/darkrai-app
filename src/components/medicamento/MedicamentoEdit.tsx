import React, { useState } from "react";
import { Edit } from "@refinedev/chakra-ui";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";
import { Medicamento } from "src/types";
import { toDateStringInput } from "src/utils/dates";

export const MedicamentoEdit = () => {
    const {
        refineCore: { formLoading, queryResult },
        saveButtonProps,
        register,
        resetField,
        control,
        formState: { errors },
        getValues
    } = useForm<Medicamento> ();

    const medicamentoData = queryResult?.data?.data;
    // console.log(_formValues.caducidad);
    // console.log(`${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`);
    
    // console.log(_formValues.caducidad);
    console.log({...register("caducidad", {
        required: "This field is required",
        valueAsDate: true,
    })});
    

    return (
        <Edit title='Editar medicamento' isLoading={formLoading} saveButtonProps={saveButtonProps}>
            
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
                <FormLabel>Sustancia activa</FormLabel>
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

            <FormControl mb="3" isInvalid={!!(errors as any)?.lote}>
                <FormLabel>Lote</FormLabel>
                <Input
                    type="text"
                    {...register("lote", {
                        required: "This field is required",
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.lote?.message as string}
                </FormErrorMessage>
            </FormControl>
            
            <FormControl mb="3" isInvalid={!!(errors as any)?.caducidad}>
                <FormLabel>Fecha de caducidad</FormLabel>
                <Input
                    {...register("caducidad", {
                        required: "This field is required",
                        valueAsDate: true,
                    })}
                    placeholder="Selecciona una fecha"
                    size="md"
                    type="date"
                    required={true}
                />
                <FormErrorMessage>
                    {(errors as any)?.caducidad?.message as string}
                </FormErrorMessage>
            </FormControl>

            <FormControl mb="3" isInvalid={!!(errors as any)?.concentrado}>
                <FormLabel>Concentrado</FormLabel>
                <Input
                    type="number"
                    {...register("concentrado", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.concentrado?.message as string}
                </FormErrorMessage>
            </FormControl>

        </Edit>
    );
};

import React from "react";
import { Edit } from "@refinedev/chakra-ui";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";

export const EnfermeroEdit = () => {
    const {
        refineCore: { formLoading, queryResult },
        saveButtonProps,
        register,
        resetField,
        formState: { errors },
    } = useForm();

    const enfermeroData = queryResult?.data?.data;

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
        </Edit>
    );
};

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
import { useSelect } from "@refinedev/core";

export const PacienteEdit = () => {
    const {
        refineCore: { formLoading, queryResult },
        saveButtonProps,
        register,
        resetField,
        formState: { errors },
    } = useForm();

    const pacienteData = queryResult?.data?.data;

    const { options: tratamientosOptions } = useSelect({
        resource: "tratamiento",
        defaultValue: pacienteData?.tratamientos,
    });

    React.useEffect(() => {
        resetField("tratamientos");
    }, [tratamientosOptions]);

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
            {/* <FormControl mb="3" isInvalid={!!errors?.tratamientos}>
                <FormLabel>Tratamientos</FormLabel>
                <Select
                    placeholder="Select tratamiento"
                    {...register("tratamientos", {
                        required: "This field is required",
                    })}
                >
                    {tratamientosOptions?.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
                <FormErrorMessage>
                    {(errors as any)?.tratamientos?.message as string}
                </FormErrorMessage>
            </FormControl> */}
        </Edit>
    );
};

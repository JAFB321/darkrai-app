import { Create } from "@refinedev/chakra-ui";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Select,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";
import { useSelect } from "@refinedev/core";
import { Paciente } from "src/types";

export const TratamientoCreate = () => {
    const {
        refineCore: { formLoading },
        saveButtonProps,
        register,
        formState: { errors },
    } = useForm();

    const { options: pacienteOptions } = useSelect<Paciente>({
        resource: "paciente",
        optionLabel: 'nombre'
    });

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
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
            <FormControl mb="3" isInvalid={!!errors?.pacienteId}>
                <FormLabel>Paciente</FormLabel>
                <Select
                    placeholder="Select paciente"
                    {...register("pacienteId", {
                        required: "This field is required",
                    })}
                >
                    {pacienteOptions?.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
                <FormErrorMessage>
                    {(errors as any)?.pacienteId?.message as string}
                </FormErrorMessage>
            </FormControl>
        </Create>
    );
};

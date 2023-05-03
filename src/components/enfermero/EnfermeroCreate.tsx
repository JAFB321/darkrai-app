import { Create } from "@refinedev/chakra-ui";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";
import { Enfermero } from "src/types";

export const EnfermeroCreate = () => {
    const {
        refineCore: { formLoading },
        saveButtonProps,
        register,
        formState: { errors },
    } = useForm<Enfermero>();

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

            <FormControl mb="3" isInvalid={!!(errors as any)?.username}>
                <FormLabel>Nombre de usuario del sistema</FormLabel>
                <Input
                    {...register("username", {
                        required: "This field is required",
                    })}
                    type="email"
                />
                <FormErrorMessage>
                    {(errors as any)?.username?.message as string}
                </FormErrorMessage>
            </FormControl>

            <FormControl mb="3" isInvalid={!!(errors as any)?.password}>
                <FormLabel>Contraseña</FormLabel>
                <Input
                    type="password"
                    {...register("password", {
                        required: "This field is required",
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.password?.message as string}
                </FormErrorMessage>
            </FormControl>
        </Create>
    );
};

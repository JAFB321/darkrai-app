import { Create } from "@refinedev/chakra-ui";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";

export const MedicamentoCreate = () => {
    const {
        refineCore: { formLoading },
        saveButtonProps,
        register,
        formState: { errors },
    } = useForm();

    return (
        <Create title='Crear medicamento' isLoading={formLoading} saveButtonProps={saveButtonProps}>
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
                    placeholder="En mg"
                />
                <FormErrorMessage>
                    {(errors as any)?.concentrado?.message as string}
                </FormErrorMessage>
            </FormControl>
        </Create>
    );
};

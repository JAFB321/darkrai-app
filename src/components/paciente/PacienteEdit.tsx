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
        setError,
        clearErrors,
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

    const handleEdadErrors = (evt: any) => {
        const value = Number(evt.target.value)
        if(value < 45) setError('edad', {message: 'La edad no puede ser menor a 45 años'})
        else if (value > 120) setError('edad', {message: 'La edad no puede ser mayor a 120 años'})
        else clearErrors('edad')                        
    }

    const handlePesoErrors = (evt: any) => {
        const value = Number(evt.target.value)
        if(value < 20) setError('peso', {message: 'El peso no puede ser menor a 20 kg'})
        else if (value > 400) setError('peso', {message: 'El peso no puede ser mayor a 400 kg'})
        else clearErrors('peso')                        
    }


    const handleAlturaErrors = (evt: any) => {
        const value = Number(evt.target.value)
        if(value < 0.3) setError('altura', {message: 'La altura no puede ser menor a 30 cm'})
        else if (value > 2.7) setError('altura', {message: 'La altura no puede ser mayor a 2.7 metros'})
        else clearErrors('altura')                        
    }

    
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

            <FormControl mb="3" isInvalid={!!(errors as any)?.edad}>
                <FormLabel>Edad</FormLabel>
                <Input
                    type="number"
                    {...register("edad", {
                        required: "This field is required",
                        valueAsNumber: true,
                        min: 45,
                        max:120,
                    })}
                    onChange={handleEdadErrors}
                />
                <FormErrorMessage>
                    {(errors as any)?.edad?.message as string}
                </FormErrorMessage>
            </FormControl>

            <FormControl mb="3" isInvalid={!!(errors as any)?.peso}>
                <FormLabel>Peso</FormLabel>
                <Input
                    type="number"
                    {...register("peso", {
                        required: "This field is required",
                        valueAsNumber: true,
                        min: 20,
                        max: 400,
                    })}
                    onChange={handlePesoErrors}
                    placeholder="En kilogramos"

                />
                <FormErrorMessage>
                    {(errors as any)?.peso?.message as string}
                </FormErrorMessage>
            </FormControl>

            <FormControl mb="3" isInvalid={!!(errors as any)?.altura}>
                <FormLabel>Altura</FormLabel>
                <Input
                    type="number"
                    {...register("altura", {
                        required: "This field is required",
                        valueAsNumber: true,
                        min: 0.3,
                        max: 2.7,
                    })}
                    placeholder="En metros"
                    onChange={handleAlturaErrors}
                />
                <FormErrorMessage>
                    {(errors as any)?.altura?.message as string}
                </FormErrorMessage>
            </FormControl>

            <FormControl mb="3" isInvalid={!!(errors as any)?.contactoEmergencia}>
                <FormLabel>Contacto de emergencia</FormLabel>
                <Input
                    type="text"
                    {...register("contactoEmergencia", {
                        required: "This field is required",
                    })}
                    placeholder="Numero telefonico"
                />
                <FormErrorMessage>
                    {(errors as any)?.contactoEmergencia?.message as string}
                </FormErrorMessage>
            </FormControl>

            <FormControl mb="3" isInvalid={!!(errors as any)?.noSeguridadSocial}>
                <FormLabel>Numero de seguridad social</FormLabel>
                <Input
                    type="text"
                    {...register("noSeguridadSocial", {
                        required: "This field is required",
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.noSeguridadSocial?.message as string}
                </FormErrorMessage>
            </FormControl>

            <FormControl mb="3" isInvalid={!!(errors as any)?.genero}>
                <FormLabel>Genero</FormLabel>
                <Select
                    placeholder="Seleccione genero"
                    {...register("genero", {
                        required: "This field is required",
                    })}
                >
                    <option value={'Masculino'}>
                            Masculino
                    </option>

                    <option value={'Femenino'}>
                            Femenino
                    </option>

                    <option value={'Otro'}>
                            Otro
                    </option>
                </Select>
                <FormErrorMessage>
                    {(errors as any)?.genero?.message as string}
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

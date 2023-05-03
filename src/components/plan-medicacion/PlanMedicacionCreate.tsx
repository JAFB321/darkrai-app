import { Create } from "@refinedev/chakra-ui";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Select,
    Input,
    Spinner,
} from "@chakra-ui/react";
import { useForm} from "@refinedev/react-hook-form";
import { useMany, useOne, useSelect } from "@refinedev/core";
import { Medicamento, Paciente, Tratamiento } from "src/types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const PlanMedicacionCreate = () => {
    const {
        refineCore: { formLoading },
        saveButtonProps,
        register,
        formState: { errors, isSubmitSuccessful },
        
    } = useForm();
    const router = useRouter();

    const searchParams = useSearchParams();
    const tratamientoId = searchParams.get('tratamientoId')

    useEffect(() => {
      if(isSubmitSuccessful){
        router.push('/tratamientos/show/'+tratamientoId)
      }
    }, [isSubmitSuccessful])
    
    
   

    const { data: dataTratamiento } = useOne<Tratamiento>({
        resource: 'tratamiento',
        id: tratamientoId || undefined
    })

    const { data: dataPaciente } = useOne<Paciente>({
        resource: 'paciente',
        id: dataTratamiento?.data.pacienteId || undefined
    })

    const { data: medicamentoData } = useMany<Medicamento>({
        resource: "medicamento",
        ids: [],
    })
    const tratamiento = dataTratamiento?.data
    const medicamentos = medicamentoData?.data
    const paciente = dataPaciente?.data

    if(!tratamiento?.id) return (<Spinner/ >)

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            {tratamiento?.id + ''}
            <Input
                {...register("tratamientoId", {
                    required: "This field is required",
                })}
                type="text"
                value={tratamiento?.id + ''}
                hidden={true}
            />

            <FormControl mb="3" isInvalid={!!errors?.tratamientoId}>
                <FormLabel>Tratamiento</FormLabel>
                <Input
                    type="text"
                    value={`${tratamiento?.nombre} de ${paciente?.nombre}`}
                    disabled={true}
                    contentEditable={false}
                />
                <FormErrorMessage>
                    {(errors as any)?.tratamientoId?.message as string}
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

            <FormControl mb="3" isInvalid={!!(errors as any)?.fechaInicio}>
                <FormLabel>Fecha Inicio</FormLabel>

                <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="datetime-local"
                    required={true}
                    {...register("fechaInicio", {
                        required: "This field is required",
                    })}
                />

               {/* <Controller 
                control={control}
                name="fechaInicio"
                defaultValue={new Date()}
                render={({field}) => (
                    <DatePicker
                        className="chakra-input"
                        calendarClassName="chakra-input"
                        wrapperClassName="chakra-input"
                        selected={field.value}
                        showTimeSelect
                        timeCaption="Hora"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        onChange={field.onChange}
                        required={true}
                    />
                )}
                
               /> */}

                <FormErrorMessage>
                    {(errors as any)?.fechaInicio?.message as string}
                </FormErrorMessage>
            </FormControl>

            <FormControl mb="3" isInvalid={!!(errors as any)?.fechaFin}>
                <FormLabel>Fecha Final</FormLabel>

                <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="datetime-local"
                    required={true}
                    defaultValue={new Date().toISOString()}
                    {...register("fechaFin", {
                        required: "This field is required",
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.fechaFin?.message as string}
                </FormErrorMessage>
            </FormControl>


            <FormControl mb="3" isInvalid={!!(errors as any)?.cantidadDosis}>
                <FormLabel>Cantidad Dosis</FormLabel>
                <Input
                    type="number"
                    {...register("cantidadDosis", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.cantidadDosis?.message as string}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!(errors as any)?.intervaloHoras}>
                <FormLabel>Intervalo Horas</FormLabel>
                <Input
                    type="number"
                    {...register("intervaloHoras", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.intervaloHoras?.message as string}
                </FormErrorMessage>
            </FormControl>

        </Create>
    );
};

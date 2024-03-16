import { TextField } from '@radix-ui/themes'
import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

type Props = {
  register: UseFormRegister<IFormValues>
  errors: FieldErrors
}

type InputProps = {
  name: keyof IFormValues
  placeholder: string
  register: UseFormRegister<IFormValues>
  required?: boolean
  error?: any
}

export interface IFormValues {
  name: string
  phone: string
  address: string
}

const Input = ({
  name,
  placeholder,
  register,
  required,
  error,
}: InputProps) => (
  <>
    <TextField.Input
      placeholder={placeholder}
      {...register(name, { required })}
    />
    {error && <span className="text-red-500">Заполните данное поле</span>}
  </>
)

const createInputs = (register: UseFormRegister<IFormValues>) => [
  {
    name: 'name',
    placeholder: 'Имя',
    register: register,
    required: true,
  },
  {
    name: 'phone',
    placeholder: 'Телефон',
    register: register,
    required: true,
  },
  {
    name: 'address',
    placeholder: 'Адрес',
    register: register,
    required: true,
  },
]

const InputFields = ({ register, errors }: Props) => {
  const inputs = createInputs(register)
  return (
    <>
      {inputs.map((input) => (
        <Input
          key={input.name}
          name={input.name as keyof IFormValues}
          placeholder={input.placeholder}
          register={register}
          required={input.required}
          error={errors[input.name]}
        />
      ))}
    </>
  )
}

export default InputFields

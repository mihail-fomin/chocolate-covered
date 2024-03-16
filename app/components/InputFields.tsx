import { TextField } from '@radix-ui/themes'
import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

type Props = {
  register: UseFormRegister<IFormValues>
  errors: FieldErrors
}

type InputProps = {
  name: keyof IFormValues
  placeholder: string
  register: UseFormRegister<IFormValues>
  required?: boolean
  pattern?: {
    value: RegExp
    message: string
  }
  maxLength?: number
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
  pattern,
  maxLength,
  error,
  // invalidText,
}: InputProps) => (
  <div>
    <TextField.Input
      placeholder={placeholder}
      {...register(name, {
        required,
        pattern,
        maxLength,
      })}
    />
    {error?.type === 'required' && (
      <span className="text-red-500">Заполните данное поле</span>
    )}
    {error?.type === 'pattern' && (
      <span className="text-red-500">{pattern?.message}</span>
    )}
    {error?.type === 'maxLength' && (
      <span className="text-red-500">
        Максимальная длина - {maxLength} символа
      </span>
    )}
  </div>
)

const createInputs = (register: UseFormRegister<IFormValues>) => [
  {
    name: 'name',
    placeholder: 'Имя',
    register: register,
    required: true,
    pattern: {
      value: /^[-A-ZА-Я' ]+?$/iu,
      message: 'Имя может содержать только латинницу',
    },
    maxLength: 32,
  },
  {
    name: 'phone',
    placeholder: 'Телефон',
    register: register,
    required: true,
    pattern: {
      value: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
      message: 'Введите корректый телефон',
    },
  },
  {
    name: 'address',
    placeholder: 'Адрес',
    register: register,
    required: true,
    maxLength: 256,
  },
  {
    name: 'comments',
    placeholder: 'Комментарии к заказу',
    register: register,
    required: false,
    maxLength: 256,
  },
]

const InputFields = ({ register, errors }: Props) => {
  console.log('errors: ', errors)
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
          pattern={input.pattern}
          maxLength={input.maxLength}
          error={errors[input.name]}
        />
      ))}
    </>
  )
}

export default InputFields

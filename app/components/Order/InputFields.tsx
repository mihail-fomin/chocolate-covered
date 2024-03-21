import React from 'react'
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form'
import { Input } from './Input'
import { CreateInputs } from './CreateInputs'

type Props = {
  register: UseFormRegister<IFormValues>
  errors: FieldErrors
  watch: UseFormWatch<IFormValues>
}

export type InputProps = {
  type: string
  label?: string
  name: keyof IFormValues
  placeholder?: string
  register: UseFormRegister<IFormValues>
  watch?: UseFormWatch<IFormValues>
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
  format: string
  entrance: number
  floor: number
  intercom: string | number
  comments: string
}

const InputFields = ({ register, errors }: Props) => {
  const inputs = CreateInputs(register)
  return (
    <>
      {inputs.map((input) => (
        <Input
          type={input.type}
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

import { Flex, RadioGroup, Text, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

type Props = {
  register: UseFormRegister<IFormValues>
  errors: FieldErrors
}

enum InputType {
  Text = 'TEXT',
  Textarea = 'TEXTAREA',
  Radio = 'RADIO',
}

type InputProps = {
  type: InputType
  label?: string
  name: keyof IFormValues
  placeholder?: string
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
  format: string
}

const Input = ({
  type,
  label,
  name,
  placeholder,
  register,
  required,
  pattern,
  maxLength,
  error,
}: InputProps) => (


  <div>
    {label && <Text as='label'>{label}</Text>}
    {type === InputType.Text ? (
      <TextField.Input
        placeholder={placeholder}
        {...register(name, {
          required,
          pattern,
          maxLength,
        })}
      />
    ) : type === InputType.Radio ? (
    <RadioGroup.Root defaultValue="delivery" {...register(name)}>
      <Flex gap="2" direction="column">
        <Text as="label" size="2">
          <Flex gap="2">
          <RadioGroup.Item value="delivery"/> Доставка
        </Flex>
        </Text>
        <Text as="label" size="2">
          <Flex gap="2">
          <RadioGroup.Item value="pickup"/> Самовывоз
          </Flex>
        </Text>
      </Flex>
    </RadioGroup.Root>
    ) : (
      <TextArea></TextArea>
    )}
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
    type: InputType.Text,
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
    type: InputType.Text,
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
    type: InputType.Text,
    name: 'address',
    placeholder: 'Адрес',
    register: register,
    required: true,
    maxLength: 256,
  },
  {
    type: InputType.Radio,
    name: 'format',
    register: register,
  },
  {
    type: InputType.Textarea,
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

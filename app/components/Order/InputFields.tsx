import React from 'react'
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form'
import { Flex, RadioGroup, Text, TextArea, TextField } from '@radix-ui/themes'
import ErrorMessage from './ErrorMessage'

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

const InputFields = ({ register, errors, watch }: Props) => {
  const format = watch('format')

  return (
    <>
      <TextField.Input
        placeholder={'Имя'}
        {...register('name', {
          required: true,
          pattern: {
            value: /^[-A-ZА-Я' ]+?$/iu,
            message: 'Имя не может содержать цифры или спецсимволы',
          },
          maxLength: 32,
        })}
      />
      <ErrorMessage type={errors.name?.type} message={errors.name?.message} />
      <TextField.Input
        placeholder={'Телефон'}
        {...register('phone', {
          required: true,
          pattern: {
            value: /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/,
            message: 'Введите корректый телефон',
          },
        })}
      />
      <ErrorMessage type={errors.phone?.type} message={errors.phone?.message} />
      <RadioGroup.Root defaultValue="delivery" {...register('format')}>
        <Flex gap="2" direction="column">
          <Text as="label" size="2">
            <Flex gap="2">
              <RadioGroup.Item className="RadioGroupItem" value="delivery" />{' '}
              Доставка
            </Flex>
          </Text>
          <Text as="label" size="2">
            <Flex gap="2">
              <RadioGroup.Item className="RadioGroupItem" value="pickup" />{' '}
              Самовывоз
            </Flex>
          </Text>
        </Flex>
      </RadioGroup.Root>
      {format !== null && (
        <div className="mt-2">
          <TextField.Input
            placeholder="Адрес"
            {...register('address', {
              required: true,
              maxLength: 256,
            })}
          />
          <ErrorMessage
            type={errors.address?.type}
            message={errors.address?.message}
          />
          <Flex mt="3" gap="3">
            <TextField.Input {...register('entrance')} placeholder="Подъезд" />
            <TextField.Input {...register('floor')} placeholder="Этаж" />
            <TextField.Input {...register('intercom')} placeholder="Домофон" />
          </Flex>
        </div>
      )}
      <TextArea
        placeholder="Комментарии к заказу"
        {...register('comments')}
      ></TextArea>
    </>
  )
}

export default InputFields

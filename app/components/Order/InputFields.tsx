import React from 'react'
import {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
  FieldError,
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

const NAME_REGEX = /^[-A-ZА-Я' ]+?$/iu
const PHONE_REGEX = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/

const InputFields = ({ register, errors }: Props) => {
  const [isDeliveryFormat, setIsDeliveryFormat] = React.useState(true)

  return (
    <>
      <TextField.Input
        placeholder={'Имя'}
        {...register('name', {
          required: true,
          pattern: {
            value: NAME_REGEX,
            message: 'Имя не может содержать цифры или спецсимволы',
          },
          maxLength: 32,
        })}
      />
      <ErrorMessage error={errors.name as FieldError} />
      <TextField.Input
        placeholder={'Телефон'}
        {...register('phone', {
          required: true,
          pattern: {
            value: PHONE_REGEX,
            message: 'Введите корректый телефон',
          },
        })}
      />
      <ErrorMessage error={errors.phone as FieldError} />
      <RadioGroup.Root defaultValue="delivery" {...register('format')}>
        <Flex gap="2" direction="column">
          <Text as="label" size="2">
            <Flex gap="2">
              <RadioGroup.Item
                className="RadioGroupItem"
                value="delivery"
                onClick={() => setIsDeliveryFormat(true)}
              />{' '}
              Доставка
            </Flex>
          </Text>
          <Text as="label" size="2">
            <Flex gap="2">
              <RadioGroup.Item
                className="RadioGroupItem"
                value="pickup"
                onClick={() => setIsDeliveryFormat(false)}
              />{' '}
              Самовывоз
            </Flex>
          </Text>
        </Flex>
      </RadioGroup.Root>
      {isDeliveryFormat && (
        <div className="mt-2">
          <TextField.Input
            placeholder="Адрес"
            {...register('address', {
              required: true,
              maxLength: 256,
            })}
          />
          <ErrorMessage error={errors.address as FieldError} />
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

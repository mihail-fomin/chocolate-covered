import React from 'react'
import {
    FieldErrors,
    UseFormRegister,
    UseFormWatch,
    FieldError,
    Controller,
    Control,
} from 'react-hook-form'
import { Flex, RadioGroup, Text, TextArea, TextField } from '@radix-ui/themes'
import ErrorMessage from './ErrorMessage'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { Dayjs } from 'dayjs'
import classNames from 'classnames'

import { elevenAM, sevenPM, fivePM, isWeekend, validateDateTime } from '../utils/date'

type Props = {
    register: UseFormRegister<IFormValues>
    errors: FieldErrors
    control: Control<IFormValues>
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
    receiveType: string
    entrance: number
    floor: number
    intercom: string
    date: Dayjs
    comments: string
}

const NAME_REGEX = /^[-A-ZА-Я' ]+?$/iu
const PHONE_REGEX = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/


const InputFields = ({ register, errors, control }: Props) => {
    const [isDeliveryFormat, setIsDeliveryFormat] = React.useState(true)

    return (
        <>
            <div>
                <TextField.Input
                    className={classNames({
                        invalidInput: errors.name,
                    })}
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
            </div>
            <div>
                <TextField.Input
                    className={classNames({
                        invalidInput: errors.phone,
                    })}
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
            </div>
            <RadioGroup.Root defaultValue="DELIVERY" {...register('receiveType')}>
                <Flex gap="2" direction="column">
                    <Text as="label" size="2">
                        <Flex gap="2">
                            <RadioGroup.Item
                                className="RadioGroupItem"
                                value="DELIVERY"
                                onClick={() => setIsDeliveryFormat(true)}
                            />{' '}
                            Доставка
                        </Flex>
                    </Text>
                    <Text as="label" size="2">
                        <Flex gap="2">
                            <RadioGroup.Item
                                className="RadioGroupItem"
                                value="PICKUP"
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
                        className={classNames({
                            invalidInput: errors.address,
                        })}
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

            <Controller
                name="date"
                control={control}
                rules={{ required: true, validate: validateDateTime }}
                render={({ field }) => {
                    const minTime = elevenAM(field.value)
                    const maxTime = isWeekend(field.value)
                        ? fivePM(field.value)
                        : sevenPM(field.value)

                    return (
                        <DateTimePicker
                            className="mt-3"
                            label="Выберите дату доставки"
                            disablePast
                            value={field.value}
                            inputRef={field.ref}
                            minTime={minTime}
                            maxTime={maxTime}
                            onChange={(value) => field.onChange(value)}
                        />
                    )
                }}
            />
            <ErrorMessage error={errors.date as FieldError} />

            <TextArea placeholder="Комментарии к заказу" {...register('comments')}></TextArea>
        </>
    )
}

export default InputFields

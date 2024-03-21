import { Flex, RadioGroup, Text, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'
import { InputProps } from './InputFields'
import ErrorMessage from './ErrorMessage'

export const Input = ({
  type,
  label,
  name,
  placeholder,
  register,
  required,
  pattern,
  maxLength,
  error,
}: InputProps) => {
  const [format, setFormat] = React.useState('delivery')

  return (
    <div>
      {label && <Text as="label">{label}</Text>}
      {type === 'text' ? (
        <TextField.Input
          placeholder={placeholder}
          {...register(name, {
            required,
            pattern,
            maxLength,
          })}
        />
      ) : type === 'radio' ? (
        <>
          <RadioGroup.Root defaultValue="delivery" {...register(name)}>
            <Flex gap="2" direction="column">
              <Text as="label" size="2">
                <Flex gap="2">
                  <RadioGroup.Item
                    className="RadioGroupItem"
                    value="delivery"
                    onClick={() => {
                      setFormat('delivery')
                    }}
                  />{' '}
                  Доставка
                </Flex>
              </Text>
              <Text as="label" size="2">
                <Flex gap="2">
                  <RadioGroup.Item
                    className="RadioGroupItem"
                    value="pickup"
                    onClick={() => {
                      setFormat('pickup')
                    }}
                  />{' '}
                  Самовывоз
                </Flex>
              </Text>
            </Flex>
          </RadioGroup.Root>
          {format === 'delivery' && (
            <Flex mt="3" gap="3">
              <TextField.Input
                {...register('entrance')}
                placeholder="Подъезд"
              />
              <TextField.Input {...register('floor')} placeholder="Этаж" />
              <TextField.Input
                {...register('intercom')}
                placeholder="Домофон"
              />
            </Flex>
          )}
        </>
      ) : (
        <TextArea
          placeholder="Комментарии к заказу"
          {...register('comments')}
        ></TextArea>
      )}
      {error && <ErrorMessage type={error.type} message={error.message} />}
    </div>
  )
}

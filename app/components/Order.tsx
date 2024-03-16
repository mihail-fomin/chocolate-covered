import React from 'react'
import { Button, Dialog, Flex } from '@radix-ui/themes'
import { useForm, SubmitHandler } from 'react-hook-form'
import InputFields, { IFormValues } from './InputFields'

interface Props {
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>
  disabled: boolean
}

const Order = ({ setOpenCart, disabled }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>()
  const onSubmit: SubmitHandler<IFormValues> = (data) => console.log(data)

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button disabled={disabled}>Заказать</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Заказ</Dialog.Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="submit" />

          <InputFields register={register} errors={errors} />
        </form>

        <Flex direction="column" gap="3" mb="3"></Flex>

        <Flex justify="end">
          <Dialog.Close>
            <Button onClick={() => setOpenCart(false)} variant="soft">
              Заказать
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default Order

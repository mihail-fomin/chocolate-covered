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
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <InputFields register={register} errors={errors} />

          <Button mt="4" type="submit">
            Отправить
          </Button>
        </form>

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

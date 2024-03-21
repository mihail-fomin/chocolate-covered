import React from 'react'
import { Button, Dialog, Flex } from '@radix-ui/themes'
import { useForm, SubmitHandler } from 'react-hook-form'
import InputFields, { IFormValues } from './InputFields'
import { useAppSelector } from '@/app/lib/hooks'
import axios from 'axios'

interface Props {
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>
  disabled: boolean
}

const Order = ({ setOpenCart, disabled }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormValues>()
//   const [loading, setLoading] = React.useState(false)
  const productArray = useAppSelector((state) => state.cart.items)

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    // setLoading(true)
    try {
      const response = await axios.post('/api/message', {
        productArray,
        orderData: data,
      })
      console.log(response.data)
      setOpenCart(false)
    } catch (error) {
      console.error(error)
    } finally {
    //   setLoading(false)
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button disabled={disabled}>Заказать</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Заказ</Dialog.Title>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <InputFields register={register} errors={errors} watch={watch} />

          <Flex justify="end">
            <Button mt="4" type="submit">
              Отправить
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default Order

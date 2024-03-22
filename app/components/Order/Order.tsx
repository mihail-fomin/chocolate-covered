import React from 'react'
import { Button, Dialog, Flex } from '@radix-ui/themes'
import { useForm, SubmitHandler } from 'react-hook-form'
import InputFields, { IFormValues } from './InputFields'
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks'
import axios from 'axios'
import { clearCart } from '@/app/lib/feature/cart/cartSlice'

interface Props {
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>
  disabled: boolean
}

const Order = ({ setOpenCart, disabled }: Props) => {
  const dispatch = useAppDispatch()

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
      await axios.post('/api/message', {
        productArray,
        orderData: data,
      })
      setOpenCart(false)
      dispatch(clearCart())
    } catch (error) {
      console.error(error)
    } finally {
      //   setLoading(false)
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button className="general-btn" disabled={disabled}>
          Заказать
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Заказ</Dialog.Title>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <InputFields register={register} errors={errors} watch={watch} />

          <Flex justify="end">
            <Button mt="4" type="submit" className="general-btn">
              Отправить
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default Order

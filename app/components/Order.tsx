import React from 'react'
import { Button, Dialog, Flex, TextField } from '@radix-ui/themes'
import { useForm, SubmitHandler, Path, UseFormRegister } from "react-hook-form"


type IFormValues = {
  name: string
  phone: string
  adress: string
}

interface Props {
  setOpenCart: (open: boolean) => void
}

type InputProps = {
  label: Path<IFormValues>
  register: UseFormRegister<IFormValues>
  required: boolean
}

// The following component is an example of your existing Input Component
const Input = ({ register, required }: InputProps) => (
    <input {...register(label, { required })} />
)

const Order = ({ setOpenCart }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormValues>()
  const onSubmit: SubmitHandler<IFormValues> = (data) => console.log(data)
  console.log('name', watch("name"))
  return (
    <Dialog.Root>
    <Dialog.Trigger>
      <Button>Заказать</Button>
    </Dialog.Trigger>
    <Dialog.Content>
      <Dialog.Title>Заказ</Dialog.Title>
      <form onSubmit={handleSubmit(onSubmit)}>

        <TextField.Input defaultValue="Имя"  {...register("name", {required: true})}/>
        {errors.name && <span>This field is required</span>}

        <TextField.Input placeholder="Телефон" {...register("phone", {required: true})}/>
        {errors.phone && <span>This field is required</span>}

        <TextField.Input placeholder="Адрес" />

      <input type="submit" />
    </form>

      <Flex direction='column' gap='3' mb='3'>
      </Flex>

      <Flex justify='end'>

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
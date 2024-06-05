'use client'

import React from 'react'
import InputFields, { IFormValues } from './InputFields'
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Dayjs } from 'dayjs'
import { useRouter } from 'next/navigation'

import { clearCart } from '@/app/lib/feature/cart/cartSlice'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, Flex } from '@radix-ui/themes'

const PreorderForm = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const preorderedProducts = useAppSelector((state) => state.cart.items)

    const [loading, setLoading] = React.useState(false)

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<IFormValues>({
        defaultValues: {
            date: null as unknown as Dayjs,
        },
    })

    const onSubmit: SubmitHandler<IFormValues> = async (data) => {
        setLoading(true)
        try {
            const orderData = {
                ...data,
                date: data.date.toISOString(),
            }

            await axios.post('/api/message', {
                preorderedProducts,
                orderData,
            })

            toast.success('Заказ успешно отправлен. Ожидайте, мы с вами свяжемся.')
            dispatch(clearCart())
            router.push('/')
        } catch (error) {
            toast.error('Произошла ошибка')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className="flex flex-col gap-2 mt-3" onSubmit={handleSubmit(onSubmit)}>
            <InputFields register={register} errors={errors} control={control} />

            <Flex justify="end">
                <Button mt="4" disabled={loading} type="submit" className="general-btn">
                    {loading && <span className="loader"></span>} Отправить
                </Button>
            </Flex>
        </form>
    )
}

export default PreorderForm

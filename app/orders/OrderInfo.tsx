import { Order } from '@prisma/client'
import React from 'react'
import prisma from '../utils/connect'
import OrderItem from './OrderItem'
import { Table } from '@radix-ui/themes'
import dayjs from 'dayjs'

type Props = {
    order: Order
}

const OrderInfo = async ({ order }: Props) => {
    const orderedProducts = await prisma.orderedProduct.findMany({
        where: {
            orderId: order.id,
        },
    })

    return (
        <>
            <Table.Cell>
                {dayjs(order.createdAt).locale('ru').format('DD.MM.YYYY HH:mm')}
            </Table.Cell>
            <Table.Cell>
                {dayjs(order.recieveDate).locale('ru').format('DD.MM.YYYY HH:mm')}
            </Table.Cell>

            <Table.Cell>
                {orderedProducts.map((cartItem) => (
                    <OrderItem
                        key={cartItem.id}
                        productId={cartItem.productId}
                        quantity={cartItem.quantity}
                    />
                ))}
            </Table.Cell>

            <Table.Cell className="max-w-[20rem]">
                {order.comments ? order.comments : '-'}
            </Table.Cell>
        </>
    )
}

export default OrderInfo

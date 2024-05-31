import { Order } from '@prisma/client'
import React from 'react'
import prisma from '../utils/connect'
import OrderItem from './OrderItem'
import { Table } from '@radix-ui/themes'

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
                {new Date(order.createdAt).toLocaleDateString('ru-Ru') +
                    ' ' +
                    new Date(order.createdAt).toLocaleTimeString('ru-Ru', {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
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
        </>
    )
}

export default OrderInfo

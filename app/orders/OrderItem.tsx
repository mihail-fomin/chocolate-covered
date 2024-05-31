import { Flex, Text } from '@radix-ui/themes'
import React from 'react'
import prisma from '../utils/connect'

type Props = {
    productId: string
    quantity: number
}

const OrderItem = async ({ productId, quantity }: Props) => {
    const product = await prisma.product.findUnique({
        where: {
            id: productId,
        },
    })
    return (
        <Flex gap="3">
            <Text as="p" className="min-w-[20rem]">
                {product?.title}
            </Text>
            <Text as="p" className="w-8">
                {quantity}
                {' шт'}
            </Text>
        </Flex>
    )
}

export default OrderItem

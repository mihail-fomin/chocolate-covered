import { Product } from '@prisma/client'
import { Flex, Text } from '@radix-ui/themes'
import React from 'react'
import prisma from '../utils/connect'

type Props = {
  productId: string
  quantity: number 
}

const OrderItem = async ({productId, quantity}: Props) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId
    }
  })
  return (
  <Flex gap='3'>

    <Text as='p'>{product?.title}</Text>
    <Text as='p'>{quantity}</Text>

  </Flex>
  )
}

export default OrderItem
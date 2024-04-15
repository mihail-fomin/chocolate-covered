import { Order } from '@prisma/client'
import React from 'react'
import prisma from '../utils/connect'
import { Flex, Text } from '@radix-ui/themes'
import OrderItem from './OrderItem'

type Props = {
  order: Order
}

const OrderInfo = async ({ order }: Props) => {
  const orderedProducts = await prisma.orderedProduct.findMany({
    where: {
      orderId: order.id
    }
  })
  
  
  return (
    <div>
      {orderedProducts.map((cartItem) => (
        <OrderItem key={cartItem.id} productId={cartItem.productId} quantity={cartItem.quantity}/>
      ))}
    </div>
  )
}

export default OrderInfo
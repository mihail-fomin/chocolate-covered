import React from 'react'
import prisma from '../utils/connect'
import OrderInfo from './OrderInfo'
import CustomerInfo from './CustomerInfo'
import { Text } from '@radix-ui/themes'

type Props = {}

const page = async () => {
  const orders = await prisma.order.findMany()

  return (
    <ul className='mt-20'>
      {orders.map((order) => (
        <li key={order.id} className='flex gap-3'>
            <CustomerInfo order={order}/>
            <Text as='p'>{order.createdAt.toDateString()}</Text>
            <OrderInfo order={order}/>
        </li>
      ))}
    </ul>
  )
}

export default page
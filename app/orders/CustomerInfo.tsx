import { Order } from '@prisma/client'
import React from 'react'
import prisma from '../utils/connect'
import { Flex, Text } from '@radix-ui/themes'

type Props = {
  order: Order
}

const CustomerInfo = async ({ order }: Props) => {
  const customer = await prisma.customer.findUnique({
    where: {
      id: order.customerId
    }
  })
  return (
    <Flex gap='3'>

      <Text as='p'>{customer?.userName}</Text>
      <Text as='p'>{customer?.phone}</Text>
      <Text as='p'>{order.receiveType}</Text>
      <Text as='p'>{customer?.address ? customer.address : '-'}</Text>
      <Text as='p'>{customer?.floor ? customer.floor : '-'}</Text>
      <Text as='p'>{customer?.entrance ? customer.entrance : '-'}</Text>
      <Text as='p'>{customer?.intercom ? customer.intercom : '-'}</Text>
      <Text as='p' className='max-w-[20rem]'>{order?.comments ? order.comments : '-'}</Text>
    </Flex>
  )
}

export default CustomerInfo
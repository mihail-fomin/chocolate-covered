import React from 'react'
import { Text } from '@radix-ui/themes'
import { auth } from '@/auth'
import OrdersNavigation from './OrdersNavigation'
import OrderTable from './OrderTable'

const page = async () => {
  const session = await auth()

  return (
    <div className="h-screen">
      <OrdersNavigation />
      {session ? (
        <OrderTable />
      ) : (
        <Text as="p" weight="bold" size="5" align="center" mt="6">
          Необходимо залогиниться
        </Text>
      )}
    </div>
  )
}

export default page

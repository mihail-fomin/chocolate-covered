'use client'

import React from 'react'
import { Avatar, Box, Button, Card, Dialog, Flex, Text } from '@radix-ui/themes'
import { useAppDispatch, useAppSelector } from '../../lib/hooks'
import { getTotalPrice } from '../../utils'
import Order from '../Order/Order'
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import { incrementQuantity, decrementQuantity } from '../../lib/feature/cart/cartSlice'
import { Product } from '@prisma/client'

const Cart = () => {
  const products = useAppSelector((state) => state.cart.items)
  const [openCart, setOpenCart] = React.useState(false)
  
  const dispatch = useAppDispatch()

  const handleDecrement = (product: Product) => {
    dispatch(decrementQuantity(product))
  }

  const handleIncrement = (product: Product) => {
    dispatch(incrementQuantity(product))
  }

  return (
    <Dialog.Root open={openCart} onOpenChange={setOpenCart}>
      <Dialog.Trigger>
        <Button className="general-btn">Корзина</Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Корзина</Dialog.Title>

        <Flex direction="column" gap="3">
          <ul className="flex flex-col gap-3">
            {products.map((product) => (
              <li key={product.id}>
                <Flex direction="column" gap="3">
                  <Card>
                    <Flex gap="3" align="center">
                      <Avatar
                        size="5"
                        src={product.imageUrl}
                        radius="small"
                        fallback="T"
                      />
                      <Flex className="w-full" justify="between">
                        <Text as="div" size="2" weight="bold">
                          {product.title}
                        </Text>
                        <Flex p='2' gap='1' align='center'>
                          <Box className='p-2 hover:bg-slate-200 rounded' onClick={() => handleDecrement(product)}>
                            <MinusIcon />
                          </Box>
                          <Text as="div" size="2" color="gray"  className='border-2 rounded py-2 px-4'>
                            {product.quantity}
                          </Text>
                          <Box className='p-2 hover:bg-slate-200 rounded'  onClick={() => handleIncrement(product)}>
                            <PlusIcon />
                          </Box>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Card>
                </Flex>
              </li>
            ))}
            <Text>
              Итого: <span>{getTotalPrice(products)}</span> ₽
            </Text>
          </ul>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray" className='gray-btn'>
              Закрыть
            </Button>
          </Dialog.Close>

          <Order disabled={products.length === 0} setOpenCart={setOpenCart} />
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default Cart

'use client'

import React from 'react'
import { Avatar, Button, Card, Dialog, Flex, Text } from '@radix-ui/themes'
import { useAppSelector } from '../../lib/hooks'
import { getTotalPrice, getTotalQuantity } from '../../utils'
import Order from '../Order/Order'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import EditQuantity from './EditQuantity'

const Cart = () => {
  const products = useAppSelector((state) => state.cart.items)
  const [openCart, setOpenCart] = React.useState(false)

  const totalPrice = getTotalPrice(products)
  const totalQuantity = getTotalQuantity(products)

  return (
    <Dialog.Root open={openCart} onOpenChange={setOpenCart}>
      <Dialog.Trigger>
        <Button className="general-btn">
          <ShoppingCartIcon className="h-6" />
          {products.length ? (
            <>
              {totalPrice} ₽ / {totalQuantity} товаров
            </>
          ) : (
            'Пусто'
          )}
        </Button>
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
                      <Avatar size="5" src={product.imageUrl} radius="small" fallback="T" />
                      <Flex className="w-full" justify="between">
                        <Text as="div" size="2" weight="bold">
                          {product.title}
                        </Text>

                        <EditQuantity product={product} />
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
            <Button variant="soft" color="gray" className="gray-btn">
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

'use client'

import React from 'react'
import { useAppSelector } from '../lib/hooks'
import { getTotalPrice } from '../utils'

const Cart = () => {
  const products = useAppSelector((state) => state.cart.items)

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.title} {product.quantity}
        </li>
      ))}
      <p>
        Итого: <span>{getTotalPrice(products)}</span> ₽
      </p>
    </ul>
  )
}

export default Cart

'use client'

import React from 'react'
import { Button } from '@radix-ui/themes'
import { useAppDispatch } from '../lib/hooks'
import { addToCart } from '../lib/feature/cart/cartSlice'
import { Product } from '@prisma/client'

interface Props {
  product: Product
}

const AddtoCartButton = ({ product }: Props) => {
  const [hovered, setHovered] = React.useState(false)
  const dispatch = useAppDispatch()

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(addToCart(product))
  }

  const priceBadge = `${product.price} ₽`
  return (
    <Button
      variant="soft"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleAddClick}
    >
      {hovered ? 'Купить' : priceBadge}
    </Button>
  )
}

export default AddtoCartButton

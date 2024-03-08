'use client'

import React from 'react'
import { Button } from '@radix-ui/themes'

interface Props {
  price: number
}

const AddtoCartButton = ({ price }: Props) => {
  const [hovered, setHovered] = React.useState(false)

  // const handleAddClick = () => {
  //   setQuantity(quantity => quantity++)
  // }

  const priceBadge = `${price} ₽`
  return (
    <Button
      variant="soft"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // onClick={handleAddClick}
    >
      {hovered ? 'Купить' : priceBadge}
    </Button>
  )
}

export default AddtoCartButton

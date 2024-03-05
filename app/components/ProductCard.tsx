import { Product } from '@prisma/client'
import { Card } from '@radix-ui/themes'
import Image from 'next/image'
import React from 'react'

interface Props {
  product:  Product
}

const ProductCard = ({ product }: Props) => {
  return (
    <li className='max-w-72 h-full'>
      <Card className='h-full'>
        <Image width={300} height={300} src={product.imageUrl} alt='Картинка десерта'/>
        <h2 className=''>{product.title}</h2>
      </Card>
    </li>
  )
}

export default ProductCard
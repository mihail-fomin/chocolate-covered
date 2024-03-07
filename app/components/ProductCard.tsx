import { Product } from '@prisma/client'
import { Card } from '@radix-ui/themes'
import Image from 'next/image'
import React from 'react'

interface Props {
  product: Product
}

const ProductCard = ({ product }: Props) => {
  return (
    <li className="max-w-72 h-full">
      <Card className="h-full">
        <div className="relative h-120 overflow-hidden rounded-lg">
          <Image
            className="object-cover w-full h-full rounded-lg transition duration-1000 hover:scale-125"
            width={120}
            height={120}
            src={product.imageUrl}
            alt="Картинка десерта"
          />
        </div>
        <h2 className="mt-2">{product.title}</h2>
        <h3 className="mt-2">{product.price}&nbsp;₽</h3>
        <p>{product.weight}&nbsp;г</p>
      </Card>
    </li>
  )
}

export default ProductCard

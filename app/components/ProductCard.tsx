'use client'

import { Product } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import AddtoCartButton from './AddtoCartButton'
import { Dialog } from '@radix-ui/themes'
import ModalContent from './ModalContent'

interface Props {
  product: Product
}

const ProductCard = ({ product }: Props) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <li className="flex flex-col h-full max-w-72 border-gray-100 border-2 rounded-lg ">
          <div className="relative h-[10rem] overflow-hidden rounded-t-lg">
            <Image
              className="object-cover w-full h-full rounded-t-lg transition duration-1000 hover:scale-125"
              width={300}
              height={300}
              src={product.imageUrl}
              alt="Картинка десерта"
            />
          </div>
          <div className="flex flex-col flex-grow justify-between gap-4 p-2">
            <h2 className="mt-1 text-xs">{product.title}</h2>
            <div className="flex justify-between items-end">
              <AddtoCartButton product={product} />
              <p>{product.weight}&nbsp;г</p>
            </div>
          </div>
        </li>
      </Dialog.Trigger>
      <Dialog.Content>
        <ModalContent product={product}/>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default ProductCard

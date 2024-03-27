'use client'
import React from 'react'
import AddtoCartButton from './AddtoCartButton'
import { Dialog } from '@radix-ui/themes'
import ModalContent from './ModalContent'
import { Product } from '@prisma/client'
import ImageContainer from './ImageContainer'

type Props = {
  product: Product
}

export const ProductCard = ({ product }: Props) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <li className="flex flex-col h-full max-w-72 border-gray-100 border-2 rounded-lg ">
          <ImageContainer image={product.imageUrl} />
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
        <ModalContent product={product} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

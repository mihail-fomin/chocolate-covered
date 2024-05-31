import Image from 'next/image'
import React from 'react'
import AddtoCartButton from './AddtoCartButton'
import { Product } from '@prisma/client'
import { Heading, Text } from '@radix-ui/themes'

const ModalContent = ({ product }: { product: Product }) => {
    return (
        <li className="flex flex-col h-full">
            <div className="mx-auto">
                <Image
                    className="rounded-lg h-64 object-cover md:h-96 w-full overflow-hidden"
                    width={500}
                    height={500}
                    src={product.imageUrl}
                    alt="Картинка десерта"
                />
            </div>
            <div className="flex flex-col flex-grow justify-between gap-4 p-2">
                <Heading className="mt-1 text-xs">{product.title}</Heading>
                <Text>{product.description}</Text>
                <div className="flex justify-between items-end">
                    <AddtoCartButton product={product} />
                    <p>{product.weight}&nbsp;г</p>
                </div>
            </div>
        </li>
    )
}

export default ModalContent

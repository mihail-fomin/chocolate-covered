import Categories from '@/app/Categories'
import ProductCard from '@/app/components/ProductCard'
import prisma from '@/app/utils/connect'
import { Flex } from '@radix-ui/themes'
import React from 'react'

interface Props {
  params: { category: string }
}

const page = async ({ params: { category } }: Props) => {
  const products = await prisma.product.findMany({ where: { category } })

  return (
    <>
      <Categories />
      <Flex justify={'center'}>
        <ul className="grid grid-cols-2 gap-4 mt-3 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </Flex>
    </>
  )
}

export default page

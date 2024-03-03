import prisma from '@/app/utils/connect'
import React from 'react'
interface Props {
  params: { category: string }
}

const page = async ({ params }: Props) => {
  const category = params.category
  const products = await prisma.product.findMany({ where: { category } })

  return <ul>{products.map((product) => product.title)}</ul>
}

export default page

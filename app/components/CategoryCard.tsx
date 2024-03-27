import React from 'react'
import { Box, Card, Text } from '@radix-ui/themes'
import { Category } from '../page'
import ImageContainer from './ImageContainer'

type Props = {
  category: Category
}

const CategoryCard = ({ category }: Props) => {
  return (
    <Card>
      <ImageContainer image={category.image} />
      <Box mt="2">
        <Text>{category.rus}</Text>
      </Box>
    </Card>
  )
}

export default CategoryCard

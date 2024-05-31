import React from 'react'
import { useAppDispatch } from '../../lib/hooks'
import { incrementQuantity, decrementQuantity } from '../../lib/feature/cart/cartSlice'
import { Flex, Box, Text } from '@radix-ui/themes'
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons'
import { CartItem } from '@/app/lib/feature/cart/cartSlice'

type Props = {
    product: CartItem
}

const EditQuantity = ({ product }: Props) => {
    const dispatch = useAppDispatch()

    const handleDecrement = (product: CartItem) => {
        dispatch(decrementQuantity(product))
    }

    const handleIncrement = (product: CartItem) => {
        dispatch(incrementQuantity(product))
    }

    return (
        <Flex p="2" gap="1" align="center">
            <Box
                className="p-2 hover:bg-slate-200 rounded"
                onClick={() => handleDecrement(product)}
            >
                <MinusIcon />
            </Box>
            <Text as="div" size="2" color="gray" className="border-2 rounded py-2 px-4">
                {product.quantity}
            </Text>
            <Box
                className="p-2 hover:bg-slate-200 rounded"
                onClick={() => handleIncrement(product)}
            >
                <PlusIcon />
            </Box>
        </Flex>
    )
}

export default EditQuantity

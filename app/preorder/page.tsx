import React from 'react'

import { Text } from '@radix-ui/themes'
import Header from '../Header'
import PreorderForm from './PreorderForm'

const page = () => {
    return (
        <>
            <Header />
            <Text as="p" size="4" weight="bold" className="mt-20">
                Заказ
            </Text>
            <PreorderForm />
        </>
    )
}

export default page

import React from 'react'
import prisma from '../utils/connect'

import { Table } from '@radix-ui/themes'
import { Order } from '@prisma/client'

type Props = {
    order: Order
}

const CustomerInfo = async ({ order }: Props) => {
    const customer = await prisma.customer.findUnique({
        where: {
            id: order.customerId,
        },
    })
    return (
        <>
            <Table.Cell>{customer?.userName}</Table.Cell>
            <Table.Cell>
                <a href={`tel:${customer?.phone}`} className="text-sky-700">
                    {customer?.phone}
                </a>
            </Table.Cell>
            <Table.Cell>{order.receiveType}</Table.Cell>
            <Table.Cell>{customer?.address ? customer.address : '-'}</Table.Cell>
            <Table.Cell>{customer?.floor ? customer.floor : '-'}</Table.Cell>
            <Table.Cell>{customer?.entrance ? customer.entrance : '-'}</Table.Cell>
            <Table.Cell>{customer?.intercom ? customer.intercom : '-'}</Table.Cell>
        </>
    )
}

export default CustomerInfo

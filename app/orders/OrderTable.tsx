import React from 'react'

import { Table, TableColumnHeaderCell } from '@radix-ui/themes'
import prisma from '../utils/connect'
import OrderInfo from './OrderInfo'
import CustomerInfo from './CustomerInfo'

const OrderTable = async () => {
    const orders = await prisma.order.findMany()

    return (
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    {columns.map((column) => (
                        <TableColumnHeaderCell key={column.label}>
                            {column.label}
                        </TableColumnHeaderCell>
                    ))}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {orders.map((order) => (
                    <Table.Row key={order.id}>
                        <CustomerInfo order={order} />
                        <OrderInfo order={order} />
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    )
}

export default OrderTable

const columns: { label: string; value: string; className?: string }[] = [
    { label: 'Имя', value: '' },
    { label: 'Телефон', value: '' },
    { label: 'Способ получения', value: '' },
    { label: 'Адрес', value: '' },
    { label: 'Этаж', value: '' },
    { label: 'Подъезд', value: '' },
    { label: 'Домофон', value: '' },
    { label: 'Дата заказа', value: '' },
    { label: 'Дата получения', value: '' },
    { label: 'Товары', value: '' },
    { label: 'Комментарий', value: '' },
    // { label: 'Количество', value: ''},
]

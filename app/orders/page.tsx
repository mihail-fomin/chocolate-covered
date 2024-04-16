import React from 'react'
import prisma from '../utils/connect'
import OrderInfo from './OrderInfo'
import CustomerInfo from './CustomerInfo'
import { Table, TableColumnHeaderCell } from '@radix-ui/themes'

const page = async () => {
  const orders = await prisma.order.findMany()

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <TableColumnHeaderCell key={column.label}>{column.label}</TableColumnHeaderCell>
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

const columns: { label: string; value: string; className?: string }[] = [
  { label: 'Имя', value: '' },
  { label: 'Телефон', value: '' },
  { label: 'Способ получения', value: '' },
  { label: 'Адрес', value: '' },
  { label: 'Этаж', value: '' },
  { label: 'Домофон', value: '' },
  { label: 'Подъезд', value: '' },
  { label: 'Комментарий', value: '' },
  { label: 'Дата заказа', value: '' },
  { label: 'Товары', value: '' },
  // { label: 'Количество', value: '',},
]

export default page

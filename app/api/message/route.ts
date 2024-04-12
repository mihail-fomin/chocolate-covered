import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/utils/connect'
import { sendOrder } from '@/app/utils/telegram'
import { CartItem } from '@/app/lib/feature/cart/cartSlice'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { productArray, orderData } = body

    // Создаем массив объектов OrderedProduct для каждого продукта в заказе
    const orderedProductsData = productArray.map((product: CartItem) => ({
        product: { connect: { id: product.id } }, // Связываем существующий продукт по его id
        quantity: product.quantity,
    }))

// Создаем новый заказ в базе данных
const newOrder = await prisma.order.create({
    data: {
        products: { // Устанавливаем связанные продукты
            create: orderedProductsData,
        },
        customer: {
            create: {
                userName: orderData.name,
                phone: orderData.phone,
                address: orderData.address,
                floor: Number(orderData.floor),
                entrance: Number(orderData.entrance),
                intercom: orderData.intercom,
            },
        },
        receiveType: orderData.receiveType || 'PICKUP', // Устанавливаем тип получения
        comments: orderData.comments || '', // Устанавливаем комментарии
    },
    include: {
        products: true, // Включаем связанные продукты в ответ
        customer: true, // Включаем информацию о заказчике в ответ
    }
})
    console.log('newOrder: ', newOrder);

    await sendOrder(productArray, orderData)
    return NextResponse.json({ success: 'Message sent' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Invalid issue' }, { status: 400 })
  }
}

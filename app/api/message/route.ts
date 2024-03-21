import TelegramBot from 'node-telegram-bot-api'
import { CartItem } from '@/app/lib/feature/cart/cartSlice'
import { IFormValues } from '@/app/components/Order/InputFields'

import { NextRequest, NextResponse } from 'next/server'

const telegramToken = process.env.TG_TOKEN

let bot: TelegramBot

if (telegramToken) {
  bot = new TelegramBot(telegramToken, { polling: true })
}
// Функция для отправки сообщения в Telegram
export function sendTelegramMessage(message: string) {
  const chatId = '719127303'

  bot.sendMessage(chatId, message, { parse_mode: 'HTML' })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { productArray, orderData } = body
    const response = await sendOrder(productArray, orderData)
    return NextResponse.json({ success: 'Message sent' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Invalid issue' }, { status: 400 })
  }
}

// Функция для обработки массива объектов и отправки сообщений
export const sendOrder = async (
  productArray: CartItem[],
  orderData: IFormValues,
) => {
  try {
    const {
      name,
      phone,
      address,
      format,
      entrance,
      floor,
      intercom,
      comments,
    } = orderData
    let totalSum = 0
    let totalCount = 0
    let message = `
    <strong>Заявка с сайта</strong>
    <b>Отправитель:</b> <i>${name}</i>
    <b>Телефон:</b> <i>${phone}</i>
    <b>Способ передачи:</b> ${format === 'delivery' ? `<i>Доставка</i> ` : `<i>Самовывоз</i>`}
    ${
      format === 'delivery'
        ? `<b>Адрес:</b> <i>${address}</i>
        <b>Подъезд:</b> <i>${entrance}</i>
        <b>Этаж:</b> <i>${floor}</i>
        <b>Домофон:</b> <i>${intercom}</i>`
        : ``
    }
    ${comments.length > 0 ? `<b> Комментарии к заказу:</b> <i>${comments}</i>` : ``}
    <b> Товары: </>
    `

    for (const productItem of productArray) {
      const productAmount = productItem.quantity
      message += `<b>${productItem.title}</> в количестве <b>${productAmount}</>шт., 
      `
      totalSum += Number(productItem.price) * Number(productAmount)
      totalCount += Number(productAmount)
    }

    message += `<b> Итого: </> ${totalCount} товаров на сумму <b>${totalSum}</>руб.`

    sendTelegramMessage(message)
  } catch (error) {
    console.error(error)
  }
}

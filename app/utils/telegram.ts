import TelegramBot from 'node-telegram-bot-api'
import { CartItem } from '../lib/feature/cart/cartSlice'
import { IFormValues } from '../preorder/InputFields'

const telegramToken: any = process.env.TG_TOKEN

const bot = new TelegramBot(telegramToken, { polling: true })

// Функция для отправки сообщения в Telegram
async function sendTelegramMessage(message: string) {
    const chatId = '-1001759583869' // групповой чат (продовый)
    // const chatId = '719127303' // чат для отладки

    await bot
        .sendMessage(chatId, message, { parse_mode: 'HTML' })
        .then((response) => console.log(response))
        .catch((error) => {
            console.log(error.code) // => 'ETELEGRAM'
            console.log(error.response.body) // => { ok: false, error_code: 400, description: 'Bad Request: chat not found' }
        })
}

// Функция для обработки массива объектов и отправки сообщений
export const sendOrder = async (productArray: CartItem[], orderData: IFormValues) => {

    try {
        const { name, phone, address, receiveType, entrance, floor, intercom, comments } = orderData
        let totalSum = 0
        let totalCount = 0
        let message = `
        <strong>Заявка с сайта</strong>
        <b>Отправитель:</b> <i>${name}</i>
        <b>Телефон:</b> <i>${phone}</i>
        <b>Способ передачи:</b> <i>${receiveType === 'delivery' ? 'Доставка' : 'Самовывоз'}</i>
        ${receiveType === 'delivery' ? `<b>Адрес:</b> <i>${address}</i>` : ''}
        ${entrance ? `<b>Подъезд:</b> <i>${entrance}</i>` : ''}
        ${floor ? `<b>Этаж:</b> <i>${floor}</i>` : ''}
        ${intercom ? `<b>Домофон:</b> <i>${intercom}</i>` : ''}
        ${comments.length ? `<b>Комментарии к заказу:</b> <i>${comments}</i>` : ''}
        <b>Товары:</b>\n`

        productArray.forEach((productItem) => {
            const productAmount = productItem.quantity
            message += `<b>${productItem.title}</b> в количестве <b>${productAmount}</b> шт.\n`
            totalSum += Number(productItem.price) * Number(productAmount)
            totalCount += Number(productAmount)
        })

        message += `<b>Итого:</b> ${totalCount} товаров на сумму <b>${totalSum.toFixed(2)}</b> руб.\n`
        message += `Посмотреть заявку на сайте: https://marygreatcookie.ru/orders`

        await sendTelegramMessage(message)
    } catch (error) {
        console.error('Error while sending order', error)
    }
}

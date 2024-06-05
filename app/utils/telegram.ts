import TelegramBot from 'node-telegram-bot-api'
import { CartItem } from '../lib/feature/cart/cartSlice'

const telegramToken: any = process.env.TG_TOKEN

const bot = new TelegramBot(telegramToken, { polling: true })

// Функция для отправки сообщения в Telegram
async function sendTelegramMessage(message: string) {
    // const chatId = '-1001759583869'
    const chatId = '719127303'

    await bot
        .sendMessage(chatId, message, { parse_mode: 'HTML' })
        .then((response) => console.log(response))
        .catch((error) => {
            console.log(error.code) // => 'ETELEGRAM'
            console.log(error.response.body) // => { ok: false, error_code: 400, description: 'Bad Request: chat not found' }
        })
}

// Функция для обработки массива объектов и отправки сообщений
export const sendOrder = async (productArray: CartItem[]) => {
    try {
        let totalSum = 0
        let totalCount = 0

        for (const productItem of productArray) {
            const productAmount = productItem.quantity

            totalSum += Number(productItem.price) * Number(productAmount)
            totalCount += Number(productAmount)
        }

        const message = `
    <strong>Заявка с сайта</strong>
    ${totalCount} товаров на сумму <b>${totalSum}</>руб.
    Посмотреть заявку на сайте: https://marygreatcookie.ru/orders
    `

        await sendTelegramMessage(message)
    } catch (error) {
        console.error('Error while sending order', error)
    }
}

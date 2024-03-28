import TelegramBot from 'node-telegram-bot-api'
import { CartItem } from '../lib/feature/cart/cartSlice'
import { IFormValues } from '../components/Order/InputFields'

const telegramToken = process.env.TG_TOKEN

let bot: TelegramBot

if (telegramToken) {
  bot = new TelegramBot(telegramToken, { polling: true })
}

// Функция для отправки сообщения в Telegram
export function sendTelegramMessage(message: string) {
  console.log('message: ', message)

//   const chatId = '-1001759583869'
  const chatId = '719127303'

  bot.sendMessage(chatId, message, { parse_mode: 'HTML' })
    .then((response) => console.log(response))
    .catch((error) => {
        console.log(error.code);  // => 'ETELEGRAM'
        console.log(error.response.body); // => { ok: false, error_code: 400, description: 'Bad Request: chat not found' }
    })
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
    console.error('Error while sending order',error)
  }
}

import TelegramBot from 'node-telegram-bot-api'
import { CartItem } from '../lib/feature/cart/cartSlice'
import { IFormValues } from '../components/Order/InputFields'

const telegramToken = process.env.TG_TOKEN
const BASE_URI = 'https://api.telegram.org'

// let bot: TelegramBot

// if (telegramToken) {
//   bot = new TelegramBot(telegramToken, { polling: true })
// }

// Функция для отправки сообщения в Telegram
async function sendTelegramMessage(message: string) {
  const chat_id = '-1001759583869'
//   const chatId = '719127303'

  const response = await fetch(`${BASE_URI}/bot${telegramToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id,
          text: message,
          parse_mode: "html",
        })
      }
    )
    if (!response.ok) {
      throw new Error(`Ошибка ${response.statusText}`)
    }
    console.log('response: ', response);

//   bot.sendMessage(chatId, message, { parse_mode: 'HTML' }).catch((error) => {
//     console.log(error.code);  // => 'ETELEGRAM'
//     console.log(error.response.body); // => { ok: false, error_code: 400, description: 'Bad Request: chat not found' }

//   })
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

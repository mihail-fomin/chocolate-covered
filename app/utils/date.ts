import { Dayjs } from 'dayjs'


export const elevenAM = (day: Dayjs) => day?.set('hour', 11).startOf('hour')
export const sevenPM = (day: Dayjs) => day?.set('hour', 19).startOf('hour')
export const fivePM = (day: Dayjs) => day?.set('hour', 17).startOf('hour')

export const isWeekend = (date: Dayjs) => {
    const day = date?.day()

    return day === 0 || day === 6
}

export const validateDateTime = (date: Dayjs) => {
    if (!date) return 'Дата и время обязательны'
    const minTime = elevenAM(date)
    const maxTime = isWeekend(date) ? fivePM(date) : sevenPM(date)
    if (date.isBefore(minTime) || date.isAfter(maxTime)) {
        return 'Время должно быть между 11:00 и 19:00 (или 17:00 для выходных)'
    }
    return true
}

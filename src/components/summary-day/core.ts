import dayjs from "dayjs"

export const getWeekDay = (day: Date): string => {
    if(dayjs(day).isSame(dayjs(), 'day')) return "Hoje"
    if(dayjs(day).isSame(dayjs().subtract(1, 'day'), 'day')) return "Ontem"
    return dayjs(day).format('dddd')
}

export const getFormattedDate = (day: Date): string => {
    return `(${dayjs(day).format('D[ de ]MMMM')})`
}

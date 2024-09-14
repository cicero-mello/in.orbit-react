import dayjs from "dayjs"

export const getFormattedHours = (day: Date): string => {
    return dayjs(day).format('HH:mm') + "h"
}

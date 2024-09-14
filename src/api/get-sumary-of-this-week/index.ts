import { SummaryOfThisWeek, SummaryOfThisWeekResponse } from "./types"
import axios from "axios"

const url = "http://localhost:777/summary-of-this-week"

export const getSummaryOfThisWeek = async (): Promise<SummaryOfThisWeek> => {
    const { data } = await axios.get<SummaryOfThisWeekResponse>(url)
    return data.summaryOfThisWeek
}

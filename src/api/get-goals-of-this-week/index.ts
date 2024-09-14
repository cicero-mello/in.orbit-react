import { GetGoalsOfThisWeekResponse, GoalOfThisWeek } from "./types"
import axios from "axios"

const url = "http://localhost:777/goals-of-this-week"

export const getGoalsOfThisWeek = async (): Promise<GoalOfThisWeek[]> => {
    const { data } = await axios.get<GetGoalsOfThisWeekResponse>(url)
    return data.goalsOfThisWeek
}

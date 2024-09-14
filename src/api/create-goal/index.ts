import { CreateGoalRequest, CreateGoalResponse, Goal } from "./types"
import axios from "axios"

const url = "http://localhost:777/goal"

export const createGoal = async (
    requestBody: CreateGoalRequest
): Promise<Goal> => {
    const { data } = await axios.post<CreateGoalResponse>(
        url,
        requestBody
    )

    return data.goal
}

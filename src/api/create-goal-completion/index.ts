import { CreateGoalCompletionRequest, CreateGoalCompletionResponse, GoalCompletion } from "./types"
import axios from "axios"

const url = "http://localhost:777/goal-completion"

export const createGoalCompletion = async (
    requestBody: CreateGoalCompletionRequest
): Promise<GoalCompletion> => {
    const { data } = await axios.post<CreateGoalCompletionResponse>(
        url,
        requestBody
    )

    return data.goalCompletion
}

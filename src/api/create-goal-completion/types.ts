export interface GoalCompletion {
    id: string
    goalId: string
    createdAt: Date
}

export interface CreateGoalCompletionRequest {
    goalId: string
}

export interface CreateGoalCompletionResponse {
    goalCompletion: GoalCompletion
}

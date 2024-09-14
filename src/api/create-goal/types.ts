export interface Goal {
    id: string
    title: string
    desiredWeeklyFrequency: number
    createdAt: Date
}

export interface CreateGoalRequest {
    title: string
    desiredWeeklyFrequency: number
}

export interface CreateGoalResponse {
    goal: Goal
}

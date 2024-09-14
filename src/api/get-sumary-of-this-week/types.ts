export interface SummaryCompletionGoal {
    title: string
    id: string
    completedAt: Date
}

export interface GoalsByDay {
    day: Date,
    goals: SummaryCompletionGoal[]
}

export interface SummaryOfThisWeek {
    completedGoals: number
    totalGoals: number
    goalsByDay: GoalsByDay[]
}

export interface SummaryOfThisWeekResponse {
    summaryOfThisWeek: SummaryOfThisWeek
}

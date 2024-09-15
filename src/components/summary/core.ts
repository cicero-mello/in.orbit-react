import { GoalOfThisWeek, SummaryOfThisWeek } from "../../api";

export const getSumDesiredWeekFrequency = (
    goalsOfThisWeek: GoalOfThisWeek[]
) => {
    return goalsOfThisWeek.reduce((accumulator, goal) => {
        return accumulator + goal.desiredWeeklyFrequency
    }, 0)
}

export const getCompletedGoalsPercentage = (
    summaryOfThisWeek: SummaryOfThisWeek | undefined
) => {
    if(!summaryOfThisWeek) return 0
    return Math.round(
        summaryOfThisWeek.completedGoals * 100 /
        summaryOfThisWeek.totalGoals
    )
}

export const getCompletedGoals = (
    summaryOfThisWeek: SummaryOfThisWeek | undefined
) => {
    if(!summaryOfThisWeek) return 0
    return summaryOfThisWeek.completedGoals
}

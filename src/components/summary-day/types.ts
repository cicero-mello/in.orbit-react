import { HTMLAttributes } from "react"
import { GoalsByDay } from "../../api"

export type SummaryDayProps = (
    HTMLAttributes<HTMLDivElement>
    & GoalsByDay
)

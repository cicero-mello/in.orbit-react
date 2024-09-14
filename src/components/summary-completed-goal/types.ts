import { HTMLAttributes } from "react"
import { SummaryCompletionGoal } from "../../api"

export type SummaryCompletedGoalProps = (
    HTMLAttributes<HTMLUListElement>
    & SummaryCompletionGoal
)

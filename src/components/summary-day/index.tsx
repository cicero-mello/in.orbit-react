import { FC } from "react"
import { getFormattedDate, getWeekDay } from "./core"
import { SummaryDayProps } from "./types"
import { SummaryCompletedGoal } from "../summary-completed-goal"

export const SummaryDay: FC<SummaryDayProps> = ({
    day, goals, ...rest
}) => {
    const weekDay = getWeekDay(day)
    const formattedDate = getFormattedDate(day)

    return (
        <div className="flex flex-col gap-4" {...rest}>
            <h3 className="font-medium">
                <span className="capitalize">
                    {weekDay}
                </span>
                <span className="text-zinc-400 text-xs">
                    {" " + formattedDate}
                </span>
            </h3>
            {goals.map((completionGoal) => (
                <SummaryCompletedGoal
                    {...completionGoal}
                    key={completionGoal.id}
                />
            ))}
        </div>
    )
}

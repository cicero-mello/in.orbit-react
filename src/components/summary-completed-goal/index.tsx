import { FC } from "react"
import { CheckCircle2 } from "lucide-react"
import { getFormattedHours } from "./core"
import { SummaryCompletedGoalProps } from "./types"

export const SummaryCompletedGoal: FC<SummaryCompletedGoalProps> = ({
    completedAt, title, id, ...rest
}) => {
    const formattedHours = getFormattedHours(completedAt)

    return (
        <ul className="flex flex-col gap-3" {...rest}>
            <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-pink-500"/>
                <span className="text-sm text-zinc-400">
                    Você completou “
                    <span className="text-zinc-100">
                        {title}
                    </span>
                    ” às
                    <span className="text-zinc-100">
                        {" " + formattedHours}
                    </span>
                </span>
            </li>
        </ul>
    )
}
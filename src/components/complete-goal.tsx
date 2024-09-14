import { Plus } from "lucide-react"
import { OutlineButton } from "./ui/outline-button"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createGoalCompletion, getGoalsOfThisWeek } from "./../api"

export const CompleteGoal = () => {
    const queryClient = useQueryClient()
    const { data, isLoading } = useQuery({
        queryKey: ["getGoalsOfThisWeek"],
        queryFn: getGoalsOfThisWeek,
        staleTime: 1000 * 60
    })

    if(isLoading) return <p> Loading... </p>
    if(!data) return <p> Error </p>

    const handleCompleteGoal = async (goalId: string) => {
        await createGoalCompletion({ goalId })
        queryClient.invalidateQueries({ queryKey: ['getSummaryOfThisWeek'] })
        queryClient.invalidateQueries({ queryKey: ['getGoalsOfThisWeek'] })
    }

    return (
        <div className="flex gap-3 flex-wrap">
            {data.map(goal => (
                <OutlineButton
                    key={goal.id}
                    onClick={() => handleCompleteGoal(goal.id)}
                    disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
                >
                    <Plus className="size-4 text-zinc-600" />
                    {goal.title}
                </OutlineButton>
            ))}
        </div>
    )
}

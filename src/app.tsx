import { Dialog } from "./components/ui/dialog"
import { CreateGoal } from "./components/create-goal"
import { EmptyGoals } from "./components/empty-goals"
import { Summary } from "./components/summary"
import { useQuery } from "@tanstack/react-query"
import { getGoalsOfThisWeek } from "./api/"

export const App = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["getGoalsOfThisWeek"],
        queryFn: getGoalsOfThisWeek,
        staleTime: 1000 * 60
    })
    const haveGoals = (!!data && data.length > 0)

    if(isLoading) return <p> Loading... </p>

    return (
        <Dialog>
            {haveGoals ? <Summary /> : <EmptyGoals />}
            <CreateGoal />
        </Dialog>
    )
}

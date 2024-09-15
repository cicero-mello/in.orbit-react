import { Plus } from "lucide-react"
import { Button } from "../ui/button"
import { DialogTrigger } from "../ui/dialog"
import { InOrbitIcon } from "../icon/in-orbit-logo"
import { Progress, ProgressIndicator } from "../ui/progress-bar"
import { Separator } from "../ui/separator"
import { useQuery } from "@tanstack/react-query"
import { getGoalsOfThisWeek, getSummaryOfThisWeek } from "../../api"
import { SummaryDay } from "../summary-day"
import { CompleteGoal } from "../complete-goal"
import dayjs from "dayjs"
import { getCompletedGoals, getCompletedGoalsPercentage, getSumDesiredWeekFrequency } from "./core"

export const Summary = () => {
    const summaryOfThisWeek = useQuery({
        queryKey: ["getSummaryOfThisWeek"],
        queryFn: getSummaryOfThisWeek,
        staleTime: 1000 * 60
    })
    const goalsOfThisWeek = useQuery({
        queryKey: ["getGoalsOfThisWeek"],
        queryFn: getGoalsOfThisWeek,
        staleTime: 1000 * 60
    })

    if(summaryOfThisWeek.isLoading || goalsOfThisWeek.isLoading) {
        return <p> Loading... </p>
    }

    if(!goalsOfThisWeek.data) return <p> Error </p>

    const completedGoalsPercentage = getCompletedGoalsPercentage(summaryOfThisWeek.data)
    const sumDesiredWeekFrequency = getSumDesiredWeekFrequency(goalsOfThisWeek.data)
    const completedGoals = getCompletedGoals(summaryOfThisWeek.data)
    const firstDayOfThisWeek = dayjs().startOf('week').format('DD MMM')
    const lastDayOfThisWeek = dayjs().endOf('week').format('DD MMM')

    return (
        <div className="flex flex-col max-w-lg py-10 px-5 mx-auto gap-6">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                    <InOrbitIcon />
                    <span className="text-lg font-semibold capitalize">
                        {firstDayOfThisWeek} - {lastDayOfThisWeek}
                    </span>
                </div>
                <DialogTrigger>
                    <Button size="sm">
                        <Plus className="size-4"/>
                        Cadastrar Meta
                    </Button>
                </DialogTrigger>
            </div>

            <div className="flex flex-col gap-3">
                <Progress
                    value={completedGoals}
                    max={sumDesiredWeekFrequency}
                >
                    <ProgressIndicator style={{width: `${completedGoalsPercentage}%`}}/>
                </Progress>
                <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>
                        Você completou
                        <span className="text-zinc-100"> {completedGoals} </span>
                        de
                        <span className="text-zinc-100"> {sumDesiredWeekFrequency} </span>
                        metas nessa semana.
                    </span>
                    <span> {completedGoalsPercentage}% </span>
                </div>
            </div>

            <Separator />

            <CompleteGoal />

            {summaryOfThisWeek.data &&
                <div className="flex flex-col gap-6">
                    <h2 className="text-xl font-medium"> Sua semana </h2>
                    {summaryOfThisWeek.data.goalsByDay.map(({ day, goals }) => (
                        <SummaryDay
                            day={day}
                            goals={goals}
                            key={day.toString()}
                        />
                    ))}
                </div>
            }
        </div>
    )
}

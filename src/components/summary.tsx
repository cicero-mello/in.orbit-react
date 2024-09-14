import { Plus } from "lucide-react"
import { Button } from "./ui/button"
import { DialogTrigger } from "./ui/dialog"
import { InOrbitIcon } from "./icon/in-orbit-logo"
import { Progress, ProgressIndicator } from "./ui/progress-bar"
import { Separator } from "./ui/separator"
import { useQuery } from "@tanstack/react-query"
import { getSummaryOfThisWeek } from "../api"
import { SummaryDay } from "./summary-day"
import { CompleteGoal } from "./complete-goal"
import dayjs from "dayjs"

export const Summary = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["getSummaryOfThisWeek"],
        queryFn: getSummaryOfThisWeek,
        staleTime: 1000 * 60
    })

    if(isLoading) return <p> Loading... </p>
    if(!data) return <p> Error </p>

    const completedGoalsPercentage = Math.round(data.completedGoals * 100 / data.totalGoals)
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
                <Progress value={data.completedGoals} max={data.totalGoals}>
                    <ProgressIndicator style={{width: `${completedGoalsPercentage}%`}}/>
                </Progress>
                <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>
                        Você completou
                        <span className="text-zinc-100"> {data.completedGoals} </span>
                        de
                        <span className="text-zinc-100"> {data.totalGoals} </span>
                        metas nessa semana.
                    </span>
                    <span> {completedGoalsPercentage}% </span>
                </div>
            </div>

            <Separator />

            <CompleteGoal />

            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-medium"> Sua semana </h2>
                {data.goalsByDay.map(({ day, goals }) => (
                    <SummaryDay
                        day={day}
                        goals={goals}
                        key={day.toString()}
                    />
                ))}
            </div>
        </div>
    )
}

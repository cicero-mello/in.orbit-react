import { DialogClose, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog"
import { RadioGroup, RadioGroupIndicator, RadioGroupItem } from "../ui/radio-group"
import { X } from "lucide-react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { radioGroupOptions } from "./core"
import { useQueryClient } from "@tanstack/react-query"
import { useForm, Controller } from "react-hook-form"
import { createGoal, CreateGoalRequest } from "../../api"
import { zodResolver } from '@hookform/resolvers/zod'
import z from "zod"

const goalForm = z.object({
    title: z.string().min(1, 'Informe a atividade que deseja realizar'),
    desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
})

export const CreateGoal = () => {
    const queryClient = useQueryClient()
    const { register, reset, handleSubmit, control, formState } = useForm<CreateGoalRequest>({
        resolver: zodResolver(goalForm)
    })

    const handleCreateGoal = async (data: CreateGoalRequest) => {
        await createGoal(data)
        queryClient.invalidateQueries({ queryKey: ['getSummaryOfThisWeek'] })
        queryClient.invalidateQueries({ queryKey: ['getGoalsOfThisWeek'] })
        reset()
    }

    return (
        <DialogContent>
            <div className="flex h-full flex-col gap-6">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <DialogTitle> Cadastrar meta </DialogTitle>
                        <DialogClose>
                            <X className="size-5 text-zinc-600"/>
                        </DialogClose>
                    </div>
                    <DialogDescription>
                        Adicione atividades
                        que <u className="underline-offset-4">te fazem bem</u> e
                        que você quer continuar praticando toda semana.
                    </DialogDescription>
                </div>

                <form
                    className="flex flex-1 flex-col justify-between"
                    onSubmit={handleSubmit(handleCreateGoal)}
                >
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title"> Qual a atividade </Label>
                            <Input
                                autoFocus
                                id="title"
                                placeholder="Praticar exercícios, meditar, etc..."
                                {...register("title")}
                            />
                            {formState.errors.title && (
                                <p className="text-red-400 text-sm">
                                    {formState.errors.title.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title"> Quantas vezes na semana? </Label>
                            <Controller
                                control={control}
                                name="desiredWeeklyFrequency"
                                defaultValue={1}
                                render={({ field }) => (
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={"1"}
                                    >
                                        {radioGroupOptions.map(option => (
                                            <RadioGroupItem
                                                value={option.value}
                                                key={option.value}
                                            >
                                                <RadioGroupIndicator />
                                                <span className="text-zinc-300 text-sm font-medium leading-none">
                                                    {option.name}
                                                </span>
                                                <span className="text-lg leading-none">
                                                    {option.emoji}
                                                </span>
                                            </RadioGroupItem>
                                        ))}
                                    </RadioGroup>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" className="w-full">
                                Fechar
                            </Button>
                        </DialogClose>
                        <Button type="submit" className="w-full">
                            Salvar
                        </Button>
                    </div>
                </form>
            </div>
        </DialogContent>
    )
}

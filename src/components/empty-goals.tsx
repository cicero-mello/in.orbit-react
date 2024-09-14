import logo from "../assets/logo-in-orbit.svg"
import letsStart from "../assets/lets-start-illustration.svg"

import { DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"

export const EmptyGoals = () => (
    <div className="flex flex-col justify-center items-center h-dvh gap-8">
        <img src={logo} alt="in.orbit" />
        <img src={letsStart} alt="lets start illustration" />
        <p className="text-zinc-300 leading-relaxed max-w-80 text-center underline-offset-4">
            Você ainda não cadastrou nenhuma meta,
            que tal <u>cadastrar um</u> agora mesmo?
        </p>
        <DialogTrigger asChild>
            <Button>
                <Plus className="size-4"/>
                Cadastrar Meta
            </Button>
        </DialogTrigger>
    </div>
)

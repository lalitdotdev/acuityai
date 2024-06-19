import { BarChartIcon, RocketIcon } from "@radix-ui/react-icons"

export type Model = {
    value: string
    label: string
    content?: string
    icon?: any
}

export type Prompt = {
    value: string
    label: string
    content: string
}

export const models: Model[] = [
    {
        value: "default",
        label: "GPT-3.5",
        content: "gpt-3.5-turbo",
        icon: <RocketIcon className="h-4 w-4 opacity-70" />
    },
    {
        value: "GPT-4",
        label: "GPT-4",
        content: "gpt-4-turbo",
        icon: <BarChartIcon className="h-4 w-4 opacity-70" />
    }
]




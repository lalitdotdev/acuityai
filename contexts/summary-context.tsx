import { models, prompts, type Model, type Prompt } from "@/lib/constants"
import { createContext, useContext, useEffect, useState } from "react"

import { usePort } from "@plasmohq/messaging/hook"

import { useExtension } from "./extension-context"

// interface of the SummaryContext
interface SummaryContext {
    summaryModel: Model
    setSummaryModel: (model: Model) => void
    summaryPrompt: Prompt
    setSummaryPrompt: (prompt: Prompt) => void
    summaryContent: string | null
    setSummaryContent: (content: string | null) => void
    summaryIsError: boolean
    setSummaryIsError: (isError: boolean) => void
    summaryIsGenerating: boolean
    setSummaryIsGenerating: (isGenerating: boolean) => void
    generateSummary: (e: any) => void
}

// create the SummaryContext
const SummaryContext = createContext<SummaryContext | undefined>(undefined)

// custom hook to use the SummaryContext and throw an error if it's not used within a SummaryProvider
export function useSummary() {
    const context = useContext(SummaryContext)
    if (!context) {
        throw new Error("useSummary must be used within a SummaryProvider")
    }
    return context
}

// SummaryProviderProps interface with children prop
interface SummaryProviderProps {
    children: React.ReactNode
}

// SummaryProvider component with children prop
export function SummaryProvider({ children }: SummaryProviderProps) {
    // set the default model, prompt, content, error, and isGenerating states
    const [summaryModel, setSummaryModel] = useState<Model>(models[0]) // default model is the first model in the models array
    const [summaryPrompt, setSummaryPrompt] = useState<Prompt>(prompts[0]) // default prompt is the first prompt in the prompts array
    const [summaryContent, setSummaryContent] = useState<string | null>(null) // default content is null
    const [summaryIsError, setSummaryIsError] = useState<boolean>(false) // default error state is false
    const [summaryIsGenerating, setSummaryIsGenerating] = useState<boolean>(false) // default isGenerating state is false

    // get the completion port from the messaging hook
    const chatCompletionPort = usePort("completion")

    // get extension data and loading state from the extension context
    const { extensionData, extensionLoading } = useExtension()

    // generate summary content using the prompt, model, and extension data context
    async function generateSummary(e: any) {
        e.preventDefault()
        e.stopPropagation()
        console.log("generateSummary is being called", e)

        if (summaryContent !== null) {
            setSummaryContent(null)
        }

        setSummaryIsGenerating(true) // for loading indication
        setSummaryIsError(false)
        chatCompletionPort.send({
            prompt: summaryPrompt.content,
            model: summaryModel.content,
            context: extensionData
        })

    }


    // reset summary content if extension is reloaded
    useEffect(() => {
        setSummaryContent(null)
        setSummaryIsGenerating(false)
        setSummaryIsError(false)
    }, [extensionLoading])

    // set summary content if message is received
    useEffect(() => {
        if (chatCompletionPort.data?.message !== undefined && chatCompletionPort.data.isEnd === false) {
            setSummaryContent(chatCompletionPort.data.message)
        } else {
            setSummaryIsGenerating(false)
        }

        setSummaryIsError(false)
    }, [chatCompletionPort.data?.message])


    // set error state if error message is received
    useEffect(() => {
        if (chatCompletionPort.data?.error !== undefined && chatCompletionPort.data?.error !== null) {
            setSummaryIsError(true)
            setSummaryContent(null)
        } else {
            setSummaryIsError(false)
        }
    }, [chatCompletionPort.data?.error])

    const value = {
        summaryModel,
        setSummaryContent,
        setSummaryModel,
        summaryContent,
        summaryPrompt,
        setSummaryPrompt,
        summaryIsError,
        setSummaryIsError,
        summaryIsGenerating,
        setSummaryIsGenerating,
        generateSummary
    }

    return (
        // returning the SummaryContext.Provider with the value object as the value prop
        <SummaryContext.Provider value={value}>{children}</SummaryContext.Provider>
    )
}

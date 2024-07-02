

// 1. create the context with createContext and pass in the initial value
// 2. create a custom hook to use the context and throw an error if it's not used within a provider
// 3. create the provider component with the context value and children prop
// 4. return the context provider with the value and children prop

import { createContext, useContext, useMemo, useState } from "react"

import type { Transcript } from "@/lib/constants"
import { cleanJsonTranscipt } from "@/utils/functions"
import { useExtension } from "./extension-context"

// interface of the TranscriptContext with transcriptSearch, setTranscriptSearch, and transcriptJson
interface TranscriptContext {
    transcriptSearch: string
    setTranscriptSearch: (search: string) => void
    transcriptJson: Transcript[]
}

// create the TranscriptContext with transcriptSearch, setTranscriptSearch, and transcriptJson
const TranscriptContext = createContext<TranscriptContext | undefined>(
    undefined
)

// custom hook to use the TranscriptContext and throw an error if it's not used within a TranscriptProvider
export function useTranscript() {
    const context = useContext(TranscriptContext)
    if (!context) {
        throw new Error("useTranscript must be used within a TranscriptProvider")
    }
    return context
}

// TranscriptProviderProps interface with children prop

interface TranscriptProviderProps {
    children: React.ReactNode
}

// TranscriptProvider component with children prop and transcriptSearch, setTranscriptSearch, and transcriptJson states and values from the extension context and cleanJsonTranscipt function
export function TranscriptProvider({ children }: TranscriptProviderProps) {
    const [transcriptSearch, setTranscriptSearch] = useState<string>("") // default search is an empty string

    const { extensionLoading, extensionData } = useExtension() // get extensionLoading and extensionData from the extension context

    const transcriptJson = useMemo(() => { // memoize the transcriptJson value to prevent unnecessary re-renders and clean the extensionData.transcript using the cleanJsonTranscipt function if extension data and transcript exist and return the cleaned transcript data
        if (!extensionLoading && extensionData && extensionData.transcript) {
            return cleanJsonTranscipt(extensionData.transcript)
        }
        return []
    }, [extensionData, extensionLoading])

    // create the value object with transcriptSearch, setTranscriptSearch, and transcriptJson
    const value = {
        transcriptSearch,
        setTranscriptSearch,
        transcriptJson
    }

    // return the TranscriptContext.Provider with the value object and children prop
    return (
        <TranscriptContext.Provider value={value}>
            {children}
        </TranscriptContext.Provider>
    )
}

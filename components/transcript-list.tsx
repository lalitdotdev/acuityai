import { memo, useMemo } from "react"

import TranscriptItem from "./transcript-item"

type Transcript = {
    text: string
    startTime: number
    endTime: number
}

interface TranscriptListProps {
    transcript: Transcript[]
    searchInput: string
}

function TranscriptList({ transcript, searchInput }: TranscriptListProps) {
    const filteredTranscripts = useMemo(() => {
        return searchInput
            ? transcript.filter((item) =>
                item.text.toLowerCase().includes(searchInput.toLowerCase())
            )
            : transcript
    }, [transcript, searchInput])

    if (filteredTranscripts.length === 0) {
        return (
            <div className="flex justify-center items-center w-full h-32">
                <span>No results found.</span>
            </div>
        )
    }

    return (
        <div className="space-y-4 text-white">
            {filteredTranscripts.map((item: Transcript) => (
                <TranscriptItem
                    key={item.startTime}
                    item={item}
                    searchInput={searchInput}
                />
            ))}
        </div>
    )
}


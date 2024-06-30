import { Button } from "./ui/button"
import Markdown from "./markdown"
import SummarySkeleton from "./summary-skeleton"
import { useSummary } from "@/contexts/summary-context"

export default function SummaryContent() {
    const { summaryIsGenerating, summaryContent, generateSummary } = useSummary()

    // show skeleton while generating summary content
    if (!summaryContent && summaryIsGenerating) {
        return (
            <div className="flex justify-center items-center w-full p-3 bg-white dark:bg-[#0f0f0f]">
                <SummarySkeleton />
            </div>
        )
    }

    // show button to generate summary if content is empty
    if (!summaryContent && !summaryIsGenerating) {
        return (
            <div className="flex justify-center items-center w-full p-3 bg-white dark:bg-[#0f0f0f]">
                <Button
                    variant="outline"
                    className="w-full h-12 border border-white dark:text-white"
                    onClick={generateSummary}>
                    <span className="text-sm text-white">Generate Summary</span>
                </Button>
            </div>
        )
    }

    return (
        <div className="flex justify-center items-center w-full p-3 bg-white ">
            <div className="h-[600px] w-full px-3 opacity-80">
                <Markdown markdown={summaryContent} className="pb-6 " />
            </div>
        </div>
    )
}

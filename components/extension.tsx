import { Collapsible, CollapsibleContent } from "./ui/collapsible"

import { getVideoData } from "@/utils/functions"
import { useEffect } from "react"
import { useExtension } from "@/contexts/extension-context"

export default function Extension() {
    const {
        setExtensionContainer,
        setExtensionData,
        setExtensionIsOpen,
        setExtensionLoading,
        setExtensionPanel,
        setExtensionTheme,
        setExtensionVideoId,
        extensionTheme,
        extensionIsOpen,
        extensionVideoId
    } = useExtension()


    if (!extensionTheme) return null

    return (
        <main
            ref={setExtensionContainer}
            className={`antialiased w-full mb-3 z-10 ${extensionTheme}`}>
            <div className="w-full">
                <Collapsible
                    open={extensionIsOpen}
                    onOpenChange={setExtensionIsOpen}
                    className="space-y-3">
                    {/* <ExtensionActions /> */}
                    <CollapsibleContent className="w-full h-fit max-h-[500px] border border-zinc-200 rounded-md overflow-auto ">
                        {/* <ExtensionPanels /> */}
                    </CollapsibleContent>
                </Collapsible>
            </div>
        </main>
    )
}
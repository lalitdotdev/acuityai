import type {
    PlasmoCSConfig,
    PlasmoGetInlineAnchor,
    PlasmoGetShadowHostId
} from "plasmo"

import Extension from "@/components/extension"
import cssText from "data-text:~style.css"

const INJECTED_ELEMENT_ID = "#secondary.style-scope.ytd-watch-flexy"



// Ref: https://docs.plasmo.com/framework/content-scripts-ui/styling#import-stylesheet

export const getStyle = () => {
    const baseFontSize = 12
    let updatedCssText = cssText.replaceAll(":root", ":host(plasmo-csui)")
    const remRegex = /([\d.]+)rem/g
    updatedCssText = updatedCssText.replace(remRegex, (match, remValue) => {
        const pixels = parseFloat(remValue) * baseFontSize
        return `${pixels}px`
    })
    const style = document.createElement("style")
    style.textContent = updatedCssText
    return style
}


export const config: PlasmoCSConfig = {
    matches: ["https://www.youtube.com/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => ({
    element: document.querySelector(INJECTED_ELEMENT_ID),
    insertPosition: "afterbegin"
})

export const getShadowHostId: PlasmoGetShadowHostId = () => "plasmo-inline"

// window.addEventListener("load", () => {
//   console.log("content script loaded")

//   document.body.style.background = "pink"
// })


function MainUI() {
    return (
        <Extension />
    )
}

export default MainUI

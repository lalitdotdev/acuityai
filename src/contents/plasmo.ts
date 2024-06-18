import type {
  PlasmoCSConfig,
  PlasmoGetInlineAnchor,
  PlasmoGetShadowHostId
} from "plasmo"

const INJECTED_ELEMENT_ID = "#secondary.style-scope.ytd-watch-flexy"

export const config: PlasmoCSConfig = {
  matches: ["https://www.youtube.com/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => ({
  element: document.querySelector(INJECTED_ELEMENT_ID),
  insertPosition: "afterbegin"
})

export const getShadowHostId: PlasmoGetShadowHostId = () => "plasmo-inline"

window.addEventListener("load", () => {
  console.log("content script loaded")

  document.body.style.background = "pink"
})

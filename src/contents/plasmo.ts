import type { PlasmoCSConfig } from "plasmo"

const INJECTED_ELEMENT_ID = "#secondary.style-scope.ytd-watch-flexy"

export const config: PlasmoCSConfig = {
  matches: ["https://www.youtube.com/*"]
}

window.addEventListener("load", () => {
  console.log("content script loaded")

  document.body.style.background = "pink"
})

import { FOCUSABLE_ELEMENTS } from "@/consts"

export const setFocusableNode = (target: HTMLElement, index = 0) => {
  const nodes = target.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS)
  const focusableNodes = [...nodes].filter((node) => node.offsetParent !== undefined)
  if (focusableNodes) {
    setTimeout(() => {
      focusableNodes[index].focus()
    })
  }
}

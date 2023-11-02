import { lockScroll, matchMedia } from "../utility"
import type { Size } from "../utility"

import { FOCUSABLE_ELEMENTS } from "@/consts"

const { lock, unlock } = lockScroll()

class HamburgerMenu {
  readonly triggerButton!: HTMLElement

  readonly closeButton!: HTMLElement

  readonly targetMenu!: HTMLElement

  readonly targetMenuItems!: NodeListOf<HTMLElement>

  readonly mediaQuery?: Size

  readonly isAutoFocus?: boolean

  isExpanded: boolean

  closeWithClickBgBindThis: (event: Event) => void

  onKeydownBindThis: (event: KeyboardEvent) => void

  constructor({
    mediaQuery = "md",
    isAutoFocus = false,
    ...props
  }: Pick<
    HamburgerMenu,
    "triggerButton" | "closeButton" | "targetMenu" | "targetMenuItems" | "mediaQuery" | "isAutoFocus"
  >) {
    Object.assign(this, props)
    this.isExpanded = false
    this.mediaQuery = mediaQuery
    this.isAutoFocus = isAutoFocus
    this.closeWithClickBgBindThis = () => {
      return
    }
    this.onKeydownBindThis = this.onKeydown.bind(this)
  }

  init() {
    const focusableNodes = this.getFocusableNodes().filter((node) => node.offsetParent !== undefined)

    for (const node of focusableNodes) {
      node.addEventListener("click", () => this.handleClickTrigger())
    }

    this.triggerButton.addEventListener("click", () => this.handleClickTrigger())
    this.closeButton.addEventListener("click", () => {
      this.close()
      unlock()
      this.isExpanded = false
    })
  }

  private show() {
    this.isExpanded = true
    this.triggerButton.setAttribute("aria-expanded", "true")
    this.triggerButton.setAttribute("aria-label", "Hide the menu")
    this.targetMenu.setAttribute("aria-hidden", "false")
    this.closeWithClickBgBindThis = this.closeWithClickBg.bind(this)
    addEventListener("click", this.closeWithClickBgBindThis)
    addEventListener("keydown", this.onKeydownBindThis)
    if (this.isAutoFocus) this.autoFocus()

    for (const item of this.targetMenuItems) {
      item.classList.add("is-active")
    }
  }

  private close() {
    this.isExpanded = false
    this.triggerButton.setAttribute("aria-expanded", "false")
    this.triggerButton.setAttribute("aria-label", "Show menu")
    this.targetMenu.setAttribute("aria-hidden", "true")
    removeEventListener("click", this.closeWithClickBgBindThis)
    removeEventListener("keydown", this.onKeydownBindThis)

    for (const item of this.targetMenuItems) {
      item.classList.remove("is-active")
    }
  }

  private closeWithClickBg(event: Event) {
    if (!(event.target instanceof HTMLElement)) return

    const triggerButtonClass = `.${this.triggerButton.className.split(" ").join(".")}`
    const menuClass = `.${this.targetMenu.className.split(" ").join(".")}`
    if (
      !event.target.closest(triggerButtonClass) &&
      !event.target.closest(menuClass) &&
      !matchMedia(this.mediaQuery).matches
    ) {
      this.close()
      unlock()
    }
  }

  private handleClickTrigger() {
    if (this.isExpanded) {
      this.close()
      unlock()
    } else {
      this.show()
      lock()
    }
  }

  private onKeydown(event: KeyboardEvent) {
    if (!matchMedia(this.mediaQuery).matches && event.key === "Escape") {
      this.close()
      unlock()
    }
    if (event.key === "Tab") this.controlFocus(event)
  }

  private getFocusableNodes() {
    const nodes = this.targetMenu.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS)
    return [...nodes]
  }

  private autoFocus() {
    if (this.getFocusableNodes().length === 0) return
    const firstFocusableNode = this.getFocusableNodes().find((node) => node.offsetParent !== undefined)
    if (!firstFocusableNode) return
    setTimeout(() => {
      firstFocusableNode.focus()
    }, 100)
  }

  private controlFocus(event: KeyboardEvent) {
    if (this.getFocusableNodes().length === 0) return

    const focusableNodes = this.getFocusableNodes().filter((node) => node.offsetParent !== undefined)

    if (this.targetMenu.contains(document.activeElement)) {
      const focusedItemIndex =
        document.activeElement instanceof HTMLElement ? focusableNodes.indexOf(document.activeElement) : -1

      if (event.shiftKey && focusedItemIndex === 0) {
        this.triggerButton.focus()
        event.preventDefault()
      }

      if (!event.shiftKey && focusableNodes.length > 0 && focusedItemIndex === focusableNodes.length - 1) {
        this.triggerButton.focus()
        event.preventDefault()
      }
    } else if (this.triggerButton === document.activeElement) {
      if (event.shiftKey) {
        focusableNodes.at(-1)?.focus()
        event.preventDefault()
      } else {
        focusableNodes[0].focus()
        event.preventDefault()
      }
    } else {
      focusableNodes[0].focus()
    }
  }
}

export const hamburgerMenu = () => {
  const triggerButton = document.querySelector<HTMLElement>("#js-drawer-open")
  const closeButton = document.querySelector<HTMLElement>("#js-drawer-close")
  const targetMenu = document.querySelector<HTMLElement>("#js-drawer-menu")
  const targetMenuItems = document.querySelectorAll<HTMLElement>(".js-drawer-item")
  if (!triggerButton || !targetMenu || !closeButton || !targetMenuItems) return

  const instance = new HamburgerMenu({ triggerButton, closeButton, targetMenu, targetMenuItems })
  instance.init()
}

import { hashTransition } from "../common/hashTransition"
import { slideLineControl, slideLineControlMulti } from "../slideLine"

import { toggleTabPanel } from "./tab"

class TabWithSlider {
  readonly targetRoot!: HTMLElement

  readonly tabsButtons!: NodeListOf<HTMLButtonElement>

  readonly prevButton!: HTMLElement

  readonly nextButton!: HTMLElement

  currentIndex: number

  constructor(props: Pick<TabWithSlider, "targetRoot" | "tabsButtons" | "nextButton" | "prevButton">) {
    Object.assign(this, props)

    this.currentIndex = 0

    this.init()
    this.registerEvents()
  }

  private init() {
    for (const [index, tab] of this.tabsButtons.entries()) {
      tab.addEventListener("click", () => this.toggleTab(index))
    }

    if (this.tabsButtons.length > 0) {
      this.toggleTab(0)
    }
  }

  private registerEvents() {
    const srOnlyButton = document.querySelector<HTMLButtonElement>(".js-sr-only-button")

    if (!srOnlyButton) return

    this.prevButton.addEventListener("click", () => {
      const newIndex = this.currentIndex - 1
      if (newIndex >= 0) {
        this.toggleTab(newIndex)
      }

      hashTransition()

      setTimeout(() => {
        srOnlyButton.focus()
      }, 100)
    })

    this.nextButton.addEventListener("click", () => {
      const newIndex = this.currentIndex + 1
      if (newIndex < this.tabsButtons.length) {
        this.toggleTab(newIndex)
      }

      hashTransition()

      setTimeout(() => {
        srOnlyButton.focus()
      }, 100)
    })
  }

  private toggleTab(index: number) {
    toggleTabPanel(this.targetRoot, this.tabsButtons[index])
    this.currentIndex = index
    this.updateButtonState()
    slideLineControl(".js-slide-line-route-default")
    slideLineControlMulti(".js-slide-line-route-multi")
  }

  private updateButtonState() {
    this.prevButton.setAttribute("href", "#route-top")
    this.nextButton.setAttribute("href", "#route-top")

    const isFirstSlide = this.currentIndex === 0
    const isLastSlide = this.currentIndex === this.tabsButtons.length - 1

    setTimeout(() => {
      if (isFirstSlide) this.prevButton.removeAttribute("href")
      if (isLastSlide) this.nextButton.removeAttribute("href")
    }, 300)
  }
}

export const tabWithSlider = (target: string) => {
  const targetRoot = document.querySelector<HTMLElement>(target)
  if (!targetRoot) return
  const tabsButtons = targetRoot.querySelectorAll<HTMLButtonElement>('[role="tab"]')
  const prevButton = document.querySelector<HTMLLinkElement>(".js-route-tab-prev")
  const nextButton = document.querySelector<HTMLLinkElement>(".js-route-tab-next")

  if (!tabsButtons || !prevButton || !nextButton) return

  new TabWithSlider({ targetRoot, tabsButtons, prevButton, nextButton })
}

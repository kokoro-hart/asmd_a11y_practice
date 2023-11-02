import { matchMedia } from "../utility"

const BREAKPOINT = "lg"

class SlideLineControlMulti {
  readonly targetRoot!: HTMLElement

  readonly slideLines!: NodeListOf<HTMLElement>

  readonly navItems!: NodeListOf<HTMLElement>

  readonly navButton!: HTMLElement

  readonly slideLine01: HTMLElement | null

  readonly slideLine02: HTMLElement | null

  spacing: number

  constructor(props: Pick<SlideLineControlMulti, "targetRoot" | "slideLines" | "navItems" | "navButton">) {
    Object.assign(this, props)

    this.spacing = 0

    this.slideLine01 = document.querySelector<HTMLElement>(".js-nav-slide-line[data-index='1']")

    this.slideLine02 = document.querySelector<HTMLElement>(".js-nav-slide-line[data-index='2']")

    this.init()
  }

  private init() {
    this.registerEvents()

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const listener = (event: MediaQueryList | MediaQueryListEvent) => {
      if (!this.slideLine01 || !this.slideLine02) return
      if (event.matches) {
        this.slideLine01.style.opacity = "0"
        this.slideLine02.style.opacity = "1"
        this.spacing = Number.parseInt(getComputedStyle(this.navButton).paddingLeft)
        this.setCurrentItemStyles()
      } else {
        this.slideLine01.style.opacity = "1"
        this.slideLine02.style.opacity = "0"
        this.spacing = Number.parseInt(getComputedStyle(this.navButton).paddingLeft)
        this.setCurrentItemStyles()
      }
    }

    const mediaQueryList = matchMedia(BREAKPOINT)
    mediaQueryList.addEventListener("change", listener)
    listener(mediaQueryList)
  }

  private registerEvents() {
    window.addEventListener("resize", () => {
      this.setCurrentItemStyles()
    })

    for (const item of this.navItems) {
      item.addEventListener("mouseenter", () => {
        this.handleMouseEnter(item)
      })

      item.addEventListener("mouseleave", () => {
        this.handleMouseLeave()
      })

      item.querySelector("button")?.addEventListener("focus", () => {
        this.handleMouseEnter(item)
      })

      item.querySelector("button")?.addEventListener("blur", () => {
        this.handleMouseLeave()
      })
    }
  }

  private handleMouseEnter(item: HTMLElement) {
    this.setSlideLineStyles(item)
    this.changeLineView(item)
  }

  private handleMouseLeave() {
    this.setCurrentItemStyles()
  }

  private setSlideLineStyles(item: HTMLElement) {
    const width = item.offsetWidth - this.spacing
    const translateX = item.offsetLeft + this.spacing
    for (const slideLine of this.slideLines) {
      slideLine.style.width = `calc(${width}px - ${this.spacing}px)`
      slideLine.style.transform = `translateX(${translateX}px)`
    }
    this.changeLineView(item)
  }

  private setCurrentItemStyles() {
    const currentItem = this.targetRoot.querySelector<HTMLElement>("[data-current='true']")
    const currentLi = currentItem?.parentElement

    if (!currentLi) return

    this.setSlideLineStyles(currentLi)
  }

  private changeLineView(item: HTMLElement) {
    const listener = (event: MediaQueryList | MediaQueryListEvent) => {
      if (!event.matches) {
        const currentIndex = item.dataset.index

        if (!currentIndex) return

        if (!this.slideLine01 || !this.slideLine02) return
        if (Number(currentIndex) > 4) {
          this.slideLine01.style.opacity = "0"
          this.slideLine02.style.opacity = "1"
        } else {
          this.slideLine01.style.opacity = "1"
          this.slideLine02.style.opacity = "0"
        }
      }
    }

    const mediaQueryList = matchMedia(BREAKPOINT)
    mediaQueryList.addEventListener("change", listener)
    listener(mediaQueryList)
  }
}

export const slideLineControlMulti = (rootSelector: string) => {
  const targetRoot = document.querySelector<HTMLElement>(rootSelector)

  if (!targetRoot) return

  const slideLines = targetRoot.querySelectorAll<HTMLElement>(".js-nav-slide-line")

  const navItems = targetRoot.querySelectorAll<HTMLElement>(".js-nav-slide-item")

  const navButton = targetRoot.querySelector<HTMLElement>(".js-nav-slide-item button")

  if (!navItems || !navButton) return

  new SlideLineControlMulti({ targetRoot, slideLines, navItems, navButton })
}

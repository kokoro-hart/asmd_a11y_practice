import { matchMedia } from "../utility"

export class SlideLineControl {
  readonly targetRoot!: HTMLElement

  readonly slideLine!: HTMLElement

  readonly navItems!: NodeListOf<HTMLElement>

  readonly navButton!: HTMLElement

  readonly nextColumnStart!: number

  spacing: number

  constructor(props: Pick<SlideLineControl, "targetRoot" | "slideLine" | "navItems" | "navButton">) {
    Object.assign(this, props)

    this.spacing = 0

    this.init()
  }

  private init() {
    this.registerEvents()

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const listener = (event: MediaQueryList | MediaQueryListEvent) => {
      if (event.matches) {
        this.spacing = Number.parseInt(getComputedStyle(this.navButton).paddingLeft)
        this.setCurrentItemStyles()
      } else {
        this.spacing = Number.parseInt(getComputedStyle(this.navButton).paddingLeft)
        this.setCurrentItemStyles()
      }
    }

    const mediaQueryList = matchMedia("lg")
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
  }

  private handleMouseLeave() {
    this.setCurrentItemStyles()
  }

  private setSlideLineStyles(item: HTMLElement) {
    const width = item.offsetWidth - this.spacing

    const translateX = item.offsetLeft + this.spacing

    this.slideLine.style.width = `calc(${width}px - ${this.spacing}px)`

    this.slideLine.style.transform = `translateX(${translateX}px)`
  }

  private setCurrentItemStyles() {
    const currentItem = this.targetRoot.querySelector<HTMLElement>("[data-current='true']")

    if (!currentItem) return

    this.setSlideLineStyles(currentItem)
  }
}

export const slideLineControl = (rootSelector: string) => {
  const targetRoot = document.querySelector<HTMLElement>(rootSelector)

  if (!targetRoot) return

  const slideLine = targetRoot.querySelector<HTMLElement>(".js-nav-slide-line")

  if (!slideLine) return

  const navItems = targetRoot.querySelectorAll<HTMLElement>(".js-nav-slide-item")

  const navButton = targetRoot.querySelector<HTMLElement>(".js-nav-slide-item button")

  if (!navItems || !navButton) return

  new SlideLineControl({ targetRoot, slideLine, navItems, navButton })
}

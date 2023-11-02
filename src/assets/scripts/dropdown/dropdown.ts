export class Dropdown {
  readonly targetRoot!: HTMLElement

  readonly triggerButton!: HTMLElement

  readonly categoryList!: HTMLElement

  readonly categoryItems!: NodeListOf<HTMLElement>

  hiddenItem: HTMLElement | undefined

  constructor(props: Pick<Dropdown, "targetRoot" | "triggerButton" | "categoryList" | "categoryItems">) {
    Object.assign(this, props)

    this.hiddenItem = undefined

    if (!this.targetRoot || !this.triggerButton || !this.categoryList) return

    this.initList(this.categoryItems[0])

    this.registerEvents()

    for (const item of this.categoryItems) {
      this.categoryList.setAttribute("aria-hidden", "true")
      this.triggerButton.setAttribute("aria-expanded", "false")

      const params = new URLSearchParams(window.location.search)
      const categoryParam = params.get("category")

      if (!categoryParam) continue

      if (categoryParam === item.dataset.category) {
        this.initList(item)
      }
    }
  }

  protected initList(item: HTMLElement) {
    const selectedValue = item.textContent

    if (this.hiddenItem) {
      this.hiddenItem.style.display = "block"
    }

    if (item === this.hiddenItem) {
      this.hiddenItem = undefined
      this.triggerButton.innerHTML = `<span>${selectedValue}<svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M9.5 0.546142L0.5 0.546142L5 7.54614" fill="#CE3434"/></svg></span>`
    } else {
      this.hiddenItem = item as HTMLElement
      this.triggerButton.innerHTML = `<span>${selectedValue}<svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M9.5 0.546142L0.5 0.546142L5 7.54614" fill="#CE3434"/></svg></span>`
      this.hiddenItem.style.display = "none"
    }

    this.categoryList.setAttribute("aria-hidden", "true")
    this.triggerButton.setAttribute("aria-expanded", "false")
  }

  protected handleChangeItem(event: Event, item: HTMLElement) {
    event.stopPropagation()
    this.initList(item)
  }

  protected registerEvents() {
    this.triggerButton.addEventListener("click", (event) => {
      event.stopPropagation()
      const isHidden = this.categoryList.getAttribute("aria-hidden") === "true"
      this.categoryList.setAttribute("aria-hidden", isHidden ? "false" : "true")

      this.categoryList.style.top = `${this.triggerButton.getBoundingClientRect()}px`

      const isExpanded = this.triggerButton.getAttribute("aria-expanded") === "true"
      this.triggerButton.setAttribute("aria-expanded", isExpanded ? "false" : "true")
    })

    document.addEventListener("click", () => {
      this.categoryList.setAttribute("aria-hidden", "true")
      this.triggerButton.setAttribute("aria-expanded", "false")
    })

    for (const item of this.categoryItems) {
      item.addEventListener("click", (event) => this.handleChangeItem(event, item))
    }
  }
}

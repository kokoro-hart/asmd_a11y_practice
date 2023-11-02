import { matchMedia } from "../utility"

export class Pagination {
  readonly targetRoot!: HTMLElement

  readonly targetNodes!: NodeListOf<HTMLElement>

  readonly pageCounterWrap!: HTMLElement

  readonly buttonPrev!: HTMLElement

  readonly buttonNext!: HTMLElement

  readonly perPageMd!: number

  readonly perPageUnderMd!: number

  readonly articlesWrap!: HTMLElement

  currentPagerEl: HTMLElement | undefined

  totalPage: number

  totalContent: number

  perPage!: number

  currentPager!: number

  indexStart!: number

  indexEnd!: number

  maxPager!: number

  constructor(
    props: Pick<
      Pagination,
      "targetNodes" | "pageCounterWrap" | "buttonPrev" | "buttonNext" | "perPageMd" | "perPageUnderMd" | "articlesWrap"
    >
  ) {
    Object.assign(this, props)

    const { targetNodes } = props

    this.currentPagerEl = undefined

    this.init()

    this.totalContent = targetNodes.length

    this.totalPage = Math.ceil(this.totalContent / this.perPage)

    this.registerEvents()

    if (this.totalContent === 0) window.location.reload()
  }

  protected init() {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const listener = (event: MediaQueryList | MediaQueryListEvent) => {
      if (event.matches) {
        this.perPage = this.perPageMd
        this.maxPager = 7
        this.initConstructor()
        this.initQueryParams()
      } else {
        this.perPage = this.perPageUnderMd
        this.maxPager = 5
        this.initConstructor()
        this.initQueryParams()
      }
    }

    const mediaQueryList = matchMedia("md")
    mediaQueryList.addEventListener("change", listener)
    listener(mediaQueryList)
  }

  protected initConstructor() {
    this.pageCounterWrap.innerHTML = ""

    this.currentPager = 0

    this.indexStart = 0

    this.indexEnd = 0

    this.totalPage = Math.ceil(this.targetNodes.length / this.perPage)
  }

  protected initQueryParams() {
    this.updatePageState()
    this.updateCurrentButton()
  }

  protected registerEvents() {
    this.buttonNext.addEventListener("click", () => {
      this.updatePageState((this.currentPager += 1))
      // setFocusableNode(this.articlesWrap)
    })

    this.buttonPrev.addEventListener("click", () => {
      this.updatePageState((this.currentPager -= 1))
      // setFocusableNode(this.articlesWrap)
    })
  }

  protected activateButtonPrev() {
    this.buttonPrev.dataset.disable = "false"
  }

  protected activateButtonNext() {
    this.buttonNext.dataset.disable = "false"
  }

  protected disabledButtonPrev() {
    this.buttonPrev.dataset.disable = "true"
  }

  protected disabledButtonNext = () => {
    this.buttonNext.dataset.disable = "true"
  }

  protected updateCurrentButton(count = 1) {
    const currentEl = document.querySelector<HTMLElement>(`.pageNumber[data-counter-id="${count}"]`)
    if (!currentEl) return
    this.currentPagerEl = currentEl
    this.currentPagerEl?.setAttribute("data-current", "true")
  }

  protected updateContentsView(current: number, counts: number) {
    this.indexStart = current * counts - counts
    this.indexEnd = current * counts - 1
    const indexArray: Array<number> = []
    for (let i = this.indexStart; i < this.indexEnd + 1; i += 1) {
      indexArray.push(i)
    }

    for (const element of this.targetNodes) {
      const el = element
      el.style.display = "none"
    }

    for (const [index, element] of this.targetNodes.entries()) {
      if (indexArray.includes(index)) {
        const el = element
        el.style.display = "block"
      }
    }
  }

  protected updatePageState(currentCount?: number) {
    if (currentCount === 1 || currentCount === undefined || this.currentPager === 1) {
      this.currentPager = 1
      this.activateButtonNext()
      this.disabledButtonPrev()
    } else if (currentCount === this.totalPage) {
      this.currentPager = currentCount
      this.disabledButtonNext()
      this.activateButtonPrev()
    } else {
      this.currentPager = currentCount
      this.activateButtonNext()
      this.activateButtonPrev()
    }
    if (this.totalPage === 1) {
      this.disabledButtonNext()
      this.disabledButtonPrev()
    }

    this.updateContentsView(this.currentPager, this.perPage)

    this.pageCounterWrap.innerHTML = ""

    this.createPageCounter(this.currentPager, this.totalPage)

    this.updateCurrentButton(currentCount)

    for (const element of document.querySelectorAll<HTMLElement>(".pageNumber")) {
      element.addEventListener("click", () => {
        this.currentPager = Number(element.dataset.counterId)
        this.updatePageState(this.currentPager)
      })
    }
  }

  protected createPageCounter(current: number, totalPage: number) {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const createPagerEls = (i: number) => {
      const countList = document.createElement("button")
      countList.dataset.ankTop = "paginationAnchor"
      countList.dataset.counterId = String(i)
      countList.classList.add("pageNumber")
      countList.textContent = String(i)
      this.pageCounterWrap.append(countList)
    }

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const createEllipsis = () => {
      const ellipsis = document.createElement("span")
      ellipsis.classList.add("pageNumberEllipsis")
      ellipsis.textContent = "..."
      this.pageCounterWrap.append(ellipsis)
    }

    const fluctuation = this.maxPager <= 5 ? 2 : 3

    if (totalPage === 1) return

    if (totalPage > this.maxPager) {
      const startPage = 1

      if (totalPage === this.maxPager + 1) {
        for (let i = 1; i <= totalPage; i += 1) {
          createPagerEls(i)
        }
      } else if (current <= this.maxPager / 2 + 1) {
        for (let i = startPage; i <= current + 1; i += 1) {
          createPagerEls(i)
        }

        if (current < totalPage - 2) {
          createEllipsis()
        }

        const lastPageStart = this.maxPager <= 5 ? totalPage - 1 : totalPage - 2
        for (let i = lastPageStart; i <= totalPage; i += 1) {
          createPagerEls(i)
        }
      } else if (current >= totalPage - fluctuation) {
        for (let i = startPage; i <= 2; i += 1) {
          createPagerEls(i)
        }

        createEllipsis()

        const lastNumber = this.maxPager <= 5 ? 3 : 4
        const lastPageStart = totalPage - (this.maxPager - lastNumber) - 1
        for (let i = lastPageStart; i <= totalPage; i += 1) {
          createPagerEls(i)
        }
      } else {
        const maxStart = this.maxPager <= 5 ? 1 : 2
        for (let i = startPage; i <= maxStart; i += 1) {
          createPagerEls(i)
        }

        createEllipsis()

        for (let i = current - 1; i <= current + 1; i += 1) {
          createPagerEls(i)
        }

        createEllipsis()

        const lastPageStart = this.maxPager <= 5 ? totalPage : totalPage - 1
        for (let i = lastPageStart; i <= totalPage; i += 1) {
          createPagerEls(i)
        }
      }
    } else {
      for (let i = 1; i <= totalPage; i += 1) {
        createPagerEls(i)
      }
    }
  }
}

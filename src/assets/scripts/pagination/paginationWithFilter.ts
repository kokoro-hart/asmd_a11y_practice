import { Pagination } from "./pagination"

import { INITIAL_CATEGORY } from "@/consts"

class PaginationWithFilter extends Pagination {
  readonly totalArticleNodes: NodeListOf<HTMLElement>

  readonly filterButtons!: NodeListOf<HTMLElement>

  totalArticleElements: number

  currentCategory: string

  constructor(
    props: Pick<
      PaginationWithFilter,
      | "targetNodes"
      | "pageCounterWrap"
      | "buttonPrev"
      | "buttonNext"
      | "perPageMd"
      | "perPageUnderMd"
      | "filterButtons"
      | "articlesWrap"
    >
  ) {
    super(props)

    const { targetNodes, filterButtons } = props

    this.totalArticleNodes = targetNodes

    this.filterButtons = filterButtons

    this.totalArticleElements = targetNodes.length

    this.currentCategory = INITIAL_CATEGORY

    this.init()
    this.registerFilterEvents()
    this.paginationWithFilterInit()
    this.showAllArticles()
  }

  paginationWithFilterInit = () => {
    const filterButton = document.querySelector<HTMLElement>(`.js-filterTrigger[data-filter='${this.currentCategory}']`)
    const defaultFilterButton = document.querySelector<HTMLElement>(".js-filterTrigger")
    this.updateFilterState(filterButton ?? defaultFilterButton)
    this.init()
    this.updatePageState(1)
  }

  updateContentsView(current: number, counts: number) {
    this.indexStart = current * counts - counts
    this.indexEnd = current * counts - 1
    const indexArray: Array<number> = []
    for (let i = this.indexStart; i <= this.indexEnd; i += 1) {
      indexArray.push(i)
    }

    if (!this.totalArticleNodes) return

    for (const element of this.totalArticleNodes) {
      const el = element
      el.setAttribute("aria-hidden", "true")
      el.querySelector<HTMLElement>("a")?.setAttribute("tabindex", "-1")
    }

    const skeletonCards = document.querySelectorAll<HTMLElement>(".js-skeletonCard")

    for (const skeletonCard of skeletonCards) {
      skeletonCard.setAttribute("aria-hidden", "true")
    }

    let showCount = 0

    for (const [index, element] of this.totalArticleNodes.entries()) {
      const el = element

      if (this.totalArticleElements === this.totalArticleNodes.length && indexArray.includes(index)) {
        el.setAttribute("aria-hidden", "false")
        el.querySelector<HTMLElement>("a")?.setAttribute("tabindex", "0")
      }

      const dataCategory = element.dataset.category

      if (current === 1 && this.currentCategory === dataCategory) {
        if (showCount >= this.perPage) {
          return
        }

        el.setAttribute("aria-hidden", "false")
        el.querySelector<HTMLElement>("a")?.setAttribute("tabindex", "0")
        showCount += 1
      }

      if (current > 1 && this.currentCategory === dataCategory) {
        if (showCount >= this.perPage * current) {
          return
        }

        if (showCount >= this.perPage * (current - 1)) {
          el.setAttribute("aria-hidden", "false")
          el.querySelector<HTMLElement>("a")?.setAttribute("tabindex", "0")
        }

        showCount += 1
      }
    }

    for (const skeletonCard of skeletonCards) {
      skeletonCard.setAttribute("aria-hidden", "false")
    }
  }

  updatePageState(currentCount?: number) {
    const totalStep = Math.ceil(this.totalArticleElements / this.perPage)
    if (currentCount === 1 || currentCount === undefined || this.currentPager === 1) {
      this.currentPager = 1
      this.activateButtonNext()
      this.disabledButtonPrev()
    } else if (currentCount === totalStep) {
      this.currentPager = currentCount
      this.disabledButtonNext()
      this.activateButtonPrev()
    } else {
      this.currentPager = currentCount
      this.activateButtonNext()
      this.activateButtonPrev()
    }
    if (totalStep === 1) {
      this.disabledButtonNext()
      this.disabledButtonPrev()
    }

    this.updateContentsView(this.currentPager, this.perPage)

    this.pageCounterWrap.innerHTML = ""

    this.createPageCounter(this.currentPager, totalStep)

    this.updateCurrentButton(currentCount)

    const pageNumbers = document.querySelectorAll<HTMLElement>(".pageNumber")

    for (const element of pageNumbers) {
      element.addEventListener("click", () => {
        this.currentPager = Number(element.dataset.counterId)
        this.updatePageState(this.currentPager)
        // setFocusableNode(this.articlesWrap)
      })
    }
  }

  private registerFilterEvents() {
    for (const filterButton of this.filterButtons) {
      filterButton.addEventListener("click", () => {
        this.updateFilterState(filterButton)
        this.init()
        this.updatePageState(1)

        if (this.currentCategory === "all") {
          this.showAllArticles()
        }
      })
    }
  }

  private showAllArticles() {
    this.currentCategory = "all"
    this.totalArticleElements = this.totalArticleNodes.length
    this.updateContentsView(1, this.totalArticleElements)
    this.updatePageState(1)
  }

  private getArticleCount(value: Array<string> | string) {
    const dataFilterValue = value

    let length = 0
    for (const element of this.totalArticleNodes) {
      const categoryValue = element.dataset.category

      if (dataFilterValue === categoryValue) {
        length += 1
      }
    }

    return length
  }

  private updateFilterState(target: Element | null) {
    const targetButton = target instanceof HTMLElement ? target : undefined
    if (!targetButton) return

    const dataFilterValue = targetButton.dataset.filter

    for (const el of this.filterButtons) {
      el.dataset.current = "false"
    }
    targetButton.dataset.current = "true"
    this.currentCategory = String(dataFilterValue)
    this.totalArticleElements = this.getArticleCount(this.currentCategory)
  }
}

export const paginationWithFilter = () => {
  const targetRoot = document.querySelector<HTMLElement>("#js-paginationWithFilter")

  if (!targetRoot) return
  const articlesWrap = targetRoot.querySelector<HTMLElement>("#js-articlesWrap")

  const targetNodes = targetRoot.querySelectorAll<HTMLElement>(".js-articleItem")

  const pageCounterWrap = targetRoot.querySelector<HTMLElement>(".js-paginationCounter")

  const buttonPrev = targetRoot.querySelector<HTMLElement>(".js-paginationPrev")

  const buttonNext = targetRoot.querySelector<HTMLElement>(".js-paginationNext")

  const filterButtons = targetRoot.querySelectorAll<HTMLElement>(".js-filterTrigger")

  if (!targetNodes || !pageCounterWrap || !buttonPrev || !buttonNext || !filterButtons || !articlesWrap) return

  const perPage = targetRoot.dataset.perPage

  new PaginationWithFilter({
    targetNodes,
    pageCounterWrap,
    articlesWrap,
    buttonPrev,
    buttonNext,
    filterButtons,
    perPageMd: Number(perPage),
    perPageUnderMd: 6,
  })
}

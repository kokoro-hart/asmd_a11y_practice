type Option = Partial<{
  root: Element | undefined
  rootMargin: string
  thresholds: ReadonlyArray<number>
}>
type CallBack = (element: Element, isIntersecting: boolean) => void

class ScrollObserver {
  elements: NodeListOf<Element>

  callback: (element: Element, isIntersecting: boolean) => void

  options?: Option

  observer!: IntersectionObserver

  constructor(element: string, callback: (element: Element, isIntersecting: boolean) => void, options?: Option) {
    this.elements = document.querySelectorAll(element)
    const defaultOptions = {
      root: undefined,
      rootMargin: "-50% 0px",
      threshold: 0,
    }
    this.callback = callback
    this.options = Object.assign(defaultOptions, options)
    this.init()
  }

  private init() {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const initCallbackFunction = function (this: ScrollObserver, entries: IntersectionObserverEntry[]) {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          this.callback(entry.target, true)
        } else {
          this.callback(entry.target, false)
        }
      }
    }

    this.observer = new IntersectionObserver(initCallbackFunction.bind(this), this.options)
    for (const element of this.elements) this.observer.observe(element)
  }
}

const addClass: CallBack = (element, isIntersecting) => {
  if (!(element instanceof HTMLElement)) return
  if (isIntersecting) {
    element.dataset.inview = "true"
  }
}
export const addClassOnViewportEnter = () => {
  new ScrollObserver(".js-trigger", addClass, {
    rootMargin: "-40% 0px",
  })
}

const scrollElm = (() => {
  if ("scrollingElement" in document) return document.scrollingElement
  if (navigator.userAgent.includes("WebKit")) return (document as Document).body
  return (document as Document).documentElement
})()

const easingFuncs = {
  easeOutQuint: function (t: number, b: number, c: number, d: number) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b
  },
}

export const smoothEasingScroll = () => {
  const duration = 800
  const ignore = ".noscroll"
  const easing = "easeOutQuint"
  const headerHeight = document.querySelector<HTMLElement>("#js-header")?.offsetHeight ?? 0

  if (!scrollElm) return

  const smoothScrollElm = document.querySelectorAll<HTMLElement>(`a[href^="#"]:not(${ignore})`)
  for (const elm of smoothScrollElm) {
    elm.addEventListener("click", (e) => {
      e.preventDefault()
      const targetElm = document.querySelector<HTMLElement>(elm.getAttribute("href") ?? "")
      if (!targetElm) return
      const targetPos = targetElm.getBoundingClientRect().top - headerHeight - 10
      const startTime = Date.now()
      const scrollFrom = scrollElm.scrollTop
      ;(function loop() {
        const currentTime = Date.now() - startTime
        if (currentTime < duration) {
          scrollTo(0, easingFuncs[easing](currentTime, scrollFrom, targetPos, duration))
          window.requestAnimationFrame(loop)
        } else {
          scrollTo(0, targetPos + scrollFrom)
        }
      })()
    })
  }
}

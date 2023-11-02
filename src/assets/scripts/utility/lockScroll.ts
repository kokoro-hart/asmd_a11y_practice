export const lockScroll = () => {
  let windowHeight = 0

  const lock = () => {
    if (windowHeight !== undefined) {
      windowHeight = window.scrollY || window.pageYOffset
      document.body.style.top = `-${windowHeight}px`
      document.body.classList.add("_isScrollLock")
    }
  }

  const unlock = () => {
    if (windowHeight !== undefined) {
      document.body.style.top = ""
      document.body.classList.remove("_isScrollLock")
      window.scrollTo(0, windowHeight)
    }
  }

  return { lock, unlock }
}

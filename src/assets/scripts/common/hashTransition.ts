export const hashTransition = () => {
  window.addEventListener("DOMContentLoaded", () => {
    const headerHeight = document.querySelector<HTMLElement>("#js-header")?.offsetHeight ?? 0
    setTimeout(() => {
      const hash = location.hash
      if (hash === "") return
      // eslint-disable-next-line unicorn/prefer-query-selector
      const targetElm = document.getElementById(hash.replaceAll("#", ""))
      if (!targetElm) return
      const topPosition = window.scrollY + targetElm.getBoundingClientRect().top - headerHeight - 10

      scrollTo({
        top: topPosition,
      })
    }, 10)
  })
}

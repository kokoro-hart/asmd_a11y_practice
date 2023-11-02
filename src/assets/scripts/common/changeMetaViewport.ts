const metaViewport = document.querySelector('meta[name="viewport"]')

const changeMetaViewportContent = () => {
  const deviceWidth = 390
  const metaViewportContent =
    window.outerWidth < deviceWidth ? `width=${deviceWidth}` : "width=device-width, initial-scale=1"
  metaViewport?.setAttribute("content", metaViewportContent)
}

export const changeMetaViewport = () => {
  window.addEventListener("resize", () => {
    changeMetaViewportContent()
  })
  changeMetaViewportContent()
}

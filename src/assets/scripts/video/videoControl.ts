export const videoControl = (video: string, button: string) => {
  const videoEl = document.querySelector<HTMLVideoElement>(video)
  const controlButton = document.querySelector<HTMLButtonElement>(button)

  const playIcon = document.querySelector<HTMLElement>(".js-play-icon")
  const pauseIcon = document.querySelector<HTMLElement>(".js-pause-icon")

  if (!videoEl || !controlButton || !playIcon || !pauseIcon) return

  playIcon.style.display = "none"

  controlButton.addEventListener("click", () => {
    if (videoEl.paused) {
      videoEl.play()
      controlButton.setAttribute("aria-label", "Pause the video")
      playIcon.style.display = "none"
      pauseIcon.style.display = "block"
    } else {
      videoEl.pause()
      controlButton.setAttribute("aria-label", "Play the video")
      pauseIcon.style.display = "none"
      playIcon.style.display = "block"
    }
  })
}

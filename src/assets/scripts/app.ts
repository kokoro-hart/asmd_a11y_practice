import { addClassOnViewportEnter, changeMetaViewport, followCurrents, hamburgerMenu, hashTransition } from "./common"
import { videoModalWithTab } from "./video"

function App() {
  changeMetaViewport()
  hamburgerMenu()
  addClassOnViewportEnter()
  videoModalWithTab()
  hashTransition()
  followCurrents()
}

export default App()

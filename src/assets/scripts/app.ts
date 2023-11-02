import { addClassOnViewportEnter, changeMetaViewport, hamburgerMenu, hashTransition } from "./common"

function App() {
  changeMetaViewport()
  hamburgerMenu()
  addClassOnViewportEnter()
  hashTransition()
}

export default App()

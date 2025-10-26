import SuspenseWrapper from "./components/SuspenseWrapper"
import { DataProvider } from "./context/DataProvider"


const App = () => {
  return (
    <DataProvider>
    <SuspenseWrapper/>
    </DataProvider>
  )
}

export default App
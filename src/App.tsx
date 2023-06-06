import { useState } from "react"
import { OTPInputs } from "./components/OTPInputs"


function App() {
  const [stringC , setStringC] = useState("")
  return (
    <div>
        <OTPInputs setStringCode={setStringC} inputsNumber={3} />
    </div>
  )
}

export default App

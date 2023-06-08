import React, { useState } from 'react'

import {OTP} from ""
// import 'react-custom-otp/dist/index.css'
const App = () => {
  const [stringC , setStringC] = useState("")
  return (<OTP inputsNumber={3} setStringCode={setStringC} />)
}

export default App

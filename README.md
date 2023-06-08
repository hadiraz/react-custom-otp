# react-custom-otp

> A react component library for adding OTP to your project.

[![NPM](https://img.shields.io/npm/v/react-custom-otp.svg)](https://www.npmjs.com/package/react-custom-otp) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```
npm install --save react-custom-otp
```

## Usage

```tsx
import React, { useState } from 'react'

import { OTP } from 'react-custom-otp'
import 'react-custom-otp/dist/index.css'

const Example = () => {
  const [stringCode , setStringCode] = useState("")
    return (
      <OTP
        setStringCode={setStringCode}
        inputsNumber={5}
      />
    )
}
```

## License

MIT © [Hadi Raziei](https://github.com/hadiraz)

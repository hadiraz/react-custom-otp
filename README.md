# react-custom-otp

[![NPM](https://img.shields.io/npm/v/react-custom-otp.svg)](https://www.npmjs.com/package/react-custom-otp)

> A React component library for adding OTP (One-Time Password) functionality to your project.

## Install

```bash
npm install --save react-custom-otp
```
## Usage

```component.tsx
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


## Props/Options

| Prop              | Type     | Description                                                    | Required |
|-------------------|----------|----------------------------------------------------------------|----------|
| inputsClasses     | string   | CSS classes to apply to the input fields.                       | Optional |
| inputsStyles      | object   | Inline styles to apply to the input fields.                     | Optional |
| containerClasses  | string   | CSS classes to apply to the container element.                  | Optional |
| inputsNumber      | number   | The number of OTP input fields to render.                       | Required |
| setStringCode     | func     | A callback function to handle the entered OTP as a string.      | Required |
| setSubmitStatus   | func     | A callback function to handle the submit status of the OTP component, if return true it means that all the inputs have been filled. | Optional |
| separator         | string   | The separator character to use between each OTP digit.          | Optional |


## Full example
```component.tsx
import React, { useState } from 'react';
import { OTP } from 'react-custom-otp';
import 'react-custom-otp/dist/index.css';

const Example = () => {
  const [stringCode, setStringCode] = useState('');
  const [submitStatus, setSubmitStatus] = useState(false);

  return (
    <OTP
      inputsClasses="custom-inputs"
      inputsStyles={{ background: '#f1f1f1', color: '#333' }}
      containerClasses="otp-container"
      inputsNumber={6}
      setStringCode={setStringCode}
      setSubmitStatus={setSubmitStatus}
      separator={<span>-</span>}
    />
  );
};
```
\
The react-custom-otp library is designed to simplify the process of adding OTP functionality to your React projects. It provides an OTP component that can be easily integrated into your codebase. The example above demonstrates how to use the component and sets up a simple OTP input with 5 digits.

To install the library, use the provided npm command, as shown in the "Install" section. Make sure to import the necessary components and the CSS file to enable the styling.

The useState hook is used to manage the stringCode state, which holds the entered OTP value. The setStringCode function is passed as a prop to the OTP component to update the value as the user inputs the OTP.

Feel free to explore the library and customize it according to your needs!

## License

MIT © [Hadi Raziei](https://github.com/hadiraz)

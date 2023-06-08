import React, { CSSProperties, ReactElement } from 'react';
declare type InputsConfig = {
    inputsNumber: number;
    separator?: ReactElement;
    setStringCode: React.Dispatch<React.SetStateAction<string>>;
    setSubmitStatus?: React.Dispatch<React.SetStateAction<boolean>>;
    regex?: RegExp;
    inputsClasses?: string;
    inputsStyles?: CSSProperties;
    containerClasses?: string;
    containerStyles?: CSSProperties;
};
declare const OTPInputs: ({ inputsClasses, inputsStyles, inputsNumber, setStringCode, setSubmitStatus, separator, regex, }: InputsConfig) => ReactElement;
export default OTPInputs;

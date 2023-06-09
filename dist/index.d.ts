import React, { CSSProperties, ReactElement } from 'react';
export declare type InputsConfig = {
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
export declare const OTP: ({ inputsClasses, inputsStyles, containerClasses, containerStyles, inputsNumber, setStringCode, setSubmitStatus, separator, regex, }: InputsConfig) => ReactElement;

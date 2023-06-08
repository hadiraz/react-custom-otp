import React, { CSSProperties, ReactElement } from 'react';
import styles from './inputs.module.css';
import OTPInputs from './OTPInputs';

export type InputsConfig = {
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
export const OTP = ({
  inputsClasses = '',
  inputsStyles,
  containerClasses = '',
  containerStyles,
  inputsNumber,
  setStringCode,
  setSubmitStatus,
  separator,
  regex = /^[0-9]*$/,
}: InputsConfig): ReactElement => {
  return (
    <div
      style={{ ...containerStyles }}
      className={`${styles.container}
      ${containerClasses}`}
    >
      <OTPInputs
        inputsClasses={inputsClasses}
        inputsStyles={inputsStyles}
        containerClasses={containerClasses}
        inputsNumber={inputsNumber}
        setStringCode={setStringCode}
        setSubmitStatus={setSubmitStatus}
        separator={separator}
        regex={regex}
      />
    </div>
  );
};

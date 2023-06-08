import React, { useState, useEffect, createRef, Fragment } from 'react';

var styles = {"inputs":"_inputs-module__inputs__wU6F4","container":"_inputs-module__container__3ldeg"};

const OTPInputs = ({
  inputsClasses: _inputsClasses = '',
  inputsStyles,
  inputsNumber,
  setStringCode,
  setSubmitStatus,
  separator,
  regex: _regex = /^[0-9]*$/
}) => {
  const [items, setItems] = useState([]);
  const [pasteStatus, setPasteStatus] = useState(false);
  const [filledInputs, setFilledInputs] = useState(0);
  const [clickedInput, setClickedInput] = useState(null);
  useEffect(() => {
    const newArr = [];
    for (let i = 0; i < inputsNumber; i++) {
      newArr[i] = {
        id: i,
        value: '',
        reference: createRef()
      };
    }
    setItems(newArr);
  }, [inputsNumber]);
  useEffect(() => {
    setFilledInputs(0);
    const values = items.map(value => {
      return value.value;
    });
    setStringCode(values.join(''));
    items.map(value => {
      if (value.value !== '' && value.value !== ' ') {
        setFilledInputs(prev => prev + 1);
      } else setFilledInputs(0);
    });
  }, [items]);
  useEffect(() => {
    if (setSubmitStatus) {
      items.length !== 0 && filledInputs === items.length ? setSubmitStatus(false) : setSubmitStatus(true);
    }
  }, [filledInputs]);
  const setCodeDigit = (inputValue, inputId) => {
    setItems(prev => {
      const newItems = prev.map(({
        value,
        id,
        reference
      }) => {
        if (id === inputId) {
          return {
            id,
            value: inputValue,
            reference
          };
        } else return {
          id,
          value,
          reference
        };
      });
      return newItems;
    });
  };
  const checkDigits = (digit, id) => {
    var _items;
    let enteredCharacter = digit;
    const checkDigit = _regex.test(enteredCharacter);
    const nextSiblingElement = (_items = items[id + 1]) === null || _items === void 0 ? void 0 : _items.reference.current;
    if (!checkDigit) {
      enteredCharacter = '';
    }
    digit && setCodeDigit(enteredCharacter, id);
    if (checkDigit && nextSiblingElement) {
      nextSiblingElement.focus();
    }
  };
  const inputChangeHandler = (e, id) => {
    if (items.length <= inputsNumber && !pasteStatus && e.target.value.length < 2) {
      checkDigits(e.target.value, id);
    }
  };
  const inputKeyDownHandler = (e, id) => {
    var _items2;
    const target = e.target;
    const nextElement = (_items2 = items[id + 1]) === null || _items2 === void 0 ? void 0 : _items2.reference.current;
    if (target && e.key !== 'Backspace' && Number(target.value)) {
      if (id === clickedInput) {
        target.select();
        setClickedInput(null);
      } else {
        if (nextElement && !nextElement.value) {
          nextElement.focus();
        }
      }
    }
    if (target && e.key === 'Backspace') {
      var _items3;
      const prevSibling = (_items3 = items[id - 1]) === null || _items3 === void 0 ? void 0 : _items3.reference.current;
      setCodeDigit('', id);
      if (!target.value && id > 0) setCodeDigit('', id - 1);
      if (!target.value && id === 0) setCodeDigit('', id);
      if (prevSibling) {
        prevSibling.focus();
        prevSibling.select();
      }
    }
  };
  const handleClick = (e, id) => {
    setClickedInput(id);
    e.currentTarget.select();
  };
  const inputPasteHandler = e => {
    if (e.clipboardData && e.clipboardData.getData('text').length === items.length) {
      setPasteStatus(true);
      const enteredData = e.clipboardData.getData('text');
      enteredData.split('').forEach((value, index) => {
        checkDigits(value, index);
        index === items.length - 1 && setPasteStatus(false);
      });
    }
  };
  return React.createElement(Fragment, null, items.map(({
    value,
    id,
    reference
  }, key) => {
    return React.createElement(Fragment, {
      key: `OTPInput_${id}`
    }, React.createElement("input", {
      style: {
        ...inputsStyles
      },
      ref: reference,
      onClick: e => handleClick(e, id),
      onChange: e => inputChangeHandler(e, id),
      onKeyDown: e => inputKeyDownHandler(e, id),
      onPaste: e => inputPasteHandler(e),
      value: value,
      inputMode: "numeric",
      type: "text",
      autoComplete: "one-time-code",
      className: `${styles.inputs} ${_inputsClasses}`
    }), key < items.length - 1 && separator);
  }));
};

const OTP = ({
  inputsClasses: _inputsClasses = '',
  inputsStyles,
  containerClasses: _containerClasses = '',
  containerStyles,
  inputsNumber,
  setStringCode,
  setSubmitStatus,
  separator,
  regex: _regex = /^[0-9]*$/
}) => {
  return React.createElement("div", {
    style: {
      ...containerStyles
    },
    className: `${styles.container}
      ${_containerClasses}`
  }, React.createElement(OTPInputs, {
    inputsClasses: _inputsClasses,
    inputsStyles: inputsStyles,
    containerClasses: _containerClasses,
    inputsNumber: inputsNumber,
    setStringCode: setStringCode,
    setSubmitStatus: setSubmitStatus,
    separator: separator,
    regex: _regex
  }));
};

export { OTP };
//# sourceMappingURL=index.modern.js.map

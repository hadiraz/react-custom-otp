function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

var styles = {"inputs":"_inputs-module__inputs__wU6F4","container":"_inputs-module__container__3ldeg"};

var OTPInputs = function OTPInputs(_ref) {
  var _ref$inputsClasses = _ref.inputsClasses,
    inputsClasses = _ref$inputsClasses === void 0 ? '' : _ref$inputsClasses,
    inputsStyles = _ref.inputsStyles,
    inputsNumber = _ref.inputsNumber,
    setStringCode = _ref.setStringCode,
    setSubmitStatus = _ref.setSubmitStatus,
    separator = _ref.separator,
    _ref$regex = _ref.regex,
    regex = _ref$regex === void 0 ? /^[0-9]*$/ : _ref$regex;
  var _useState = React.useState([]),
    items = _useState[0],
    setItems = _useState[1];
  var _useState2 = React.useState(false),
    pasteStatus = _useState2[0],
    setPasteStatus = _useState2[1];
  var _useState3 = React.useState(0),
    filledInputs = _useState3[0],
    setFilledInputs = _useState3[1];
  var _useState4 = React.useState(null),
    clickedInput = _useState4[0],
    setClickedInput = _useState4[1];
  React.useEffect(function () {
    var newArr = [];
    for (var i = 0; i < inputsNumber; i++) {
      newArr[i] = {
        id: i,
        value: '',
        reference: React.createRef()
      };
    }
    setItems(newArr);
  }, [inputsNumber]);
  React.useEffect(function () {
    setFilledInputs(0);
    var values = items.map(function (value) {
      return value.value;
    });
    setStringCode(values.join(''));
    items.map(function (value) {
      if (value.value !== '' && value.value !== ' ') {
        setFilledInputs(function (prev) {
          return prev + 1;
        });
      } else setFilledInputs(0);
    });
  }, [items]);
  React.useEffect(function () {
    if (setSubmitStatus) {
      items.length !== 0 && filledInputs === items.length ? setSubmitStatus(false) : setSubmitStatus(true);
    }
  }, [filledInputs]);
  var setCodeDigit = function setCodeDigit(inputValue, inputId) {
    setItems(function (prev) {
      var newItems = prev.map(function (_ref2) {
        var value = _ref2.value,
          id = _ref2.id,
          reference = _ref2.reference;
        if (id === inputId) {
          return {
            id: id,
            value: inputValue,
            reference: reference
          };
        } else return {
          id: id,
          value: value,
          reference: reference
        };
      });
      return newItems;
    });
  };
  var checkDigits = function checkDigits(digit, id) {
    var _items;
    var enteredCharacter = digit;
    var checkDigit = regex.test(enteredCharacter);
    var nextSiblingElement = (_items = items[id + 1]) === null || _items === void 0 ? void 0 : _items.reference.current;
    if (!checkDigit) {
      enteredCharacter = '';
    }
    digit && setCodeDigit(enteredCharacter, id);
    if (checkDigit && nextSiblingElement) {
      nextSiblingElement.focus();
    }
  };
  var inputChangeHandler = function inputChangeHandler(e, id) {
    if (items.length <= inputsNumber && !pasteStatus && e.target.value.length < 2) {
      checkDigits(e.target.value, id);
    }
  };
  var inputKeyDownHandler = function inputKeyDownHandler(e, id) {
    var _items2;
    var target = e.target;
    var nextElement = (_items2 = items[id + 1]) === null || _items2 === void 0 ? void 0 : _items2.reference.current;
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
      var prevSibling = (_items3 = items[id - 1]) === null || _items3 === void 0 ? void 0 : _items3.reference.current;
      setCodeDigit('', id);
      if (!target.value && id > 0) setCodeDigit('', id - 1);
      if (!target.value && id === 0) setCodeDigit('', id);
      if (prevSibling) {
        prevSibling.focus();
        prevSibling.select();
      }
    }
  };
  var handleClick = function handleClick(e, id) {
    setClickedInput(id);
    e.currentTarget.select();
  };
  var inputPasteHandler = function inputPasteHandler(e) {
    if (e.clipboardData && e.clipboardData.getData('text').length === items.length) {
      setPasteStatus(true);
      var enteredData = e.clipboardData.getData('text');
      enteredData.split('').forEach(function (value, index) {
        checkDigits(value, index);
        index === items.length - 1 && setPasteStatus(false);
      });
    }
  };
  return React__default.createElement(React.Fragment, null, items.map(function (_ref3, key) {
    var value = _ref3.value,
      id = _ref3.id,
      reference = _ref3.reference;
    return React__default.createElement(React.Fragment, {
      key: "OTPInput_" + id
    }, React__default.createElement("input", {
      style: _extends({}, inputsStyles),
      ref: reference,
      onClick: function onClick(e) {
        return handleClick(e, id);
      },
      onChange: function onChange(e) {
        return inputChangeHandler(e, id);
      },
      onKeyDown: function onKeyDown(e) {
        return inputKeyDownHandler(e, id);
      },
      onPaste: function onPaste(e) {
        return inputPasteHandler(e);
      },
      value: value,
      inputMode: "numeric",
      type: "text",
      autoComplete: "one-time-code",
      className: styles.inputs + " " + inputsClasses
    }), key < items.length - 1 && separator);
  }));
};

var OTP = function OTP(_ref) {
  var _ref$inputsClasses = _ref.inputsClasses,
    inputsClasses = _ref$inputsClasses === void 0 ? '' : _ref$inputsClasses,
    inputsStyles = _ref.inputsStyles,
    _ref$containerClasses = _ref.containerClasses,
    containerClasses = _ref$containerClasses === void 0 ? '' : _ref$containerClasses,
    containerStyles = _ref.containerStyles,
    inputsNumber = _ref.inputsNumber,
    setStringCode = _ref.setStringCode,
    setSubmitStatus = _ref.setSubmitStatus,
    separator = _ref.separator,
    _ref$regex = _ref.regex,
    regex = _ref$regex === void 0 ? /^[0-9]*$/ : _ref$regex;
  return React__default.createElement("div", {
    style: _extends({}, containerStyles),
    className: styles.container + "\n      " + containerClasses
  }, React__default.createElement(OTPInputs, {
    inputsClasses: inputsClasses,
    inputsStyles: inputsStyles,
    containerClasses: containerClasses,
    inputsNumber: inputsNumber,
    setStringCode: setStringCode,
    setSubmitStatus: setSubmitStatus,
    separator: separator,
    regex: regex
  }));
};

exports.OTP = OTP;
//# sourceMappingURL=index.js.map

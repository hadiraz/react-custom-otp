import React, {
    CSSProperties,
    ChangeEvent,
    ClipboardEvent,
    KeyboardEvent,
    ReactElement,
    RefObject,
    createRef,
    useEffect,
    useState,
  } from "react";
  import "./inputs.css"

  type InputsConfig = {
    inputsNumber: number;
    separator ?: ReactElement;
    setStringCode : React.Dispatch<React.SetStateAction<string>>;
    setSubmitStatus ?: React.Dispatch<React.SetStateAction<boolean>>;
    regex ?: RegExp;
    inputsClasses ?: string ;
    inputsStyles ?: CSSProperties ;
    containerClasses ?: string ;
    containerStyles ?: CSSProperties ;
  };
  export type ItemsType = {
    id: number;
    value: string;
    reference: RefObject<HTMLInputElement>;
  };
  export const OTPInputs = ({
    inputsClasses = "",
    inputsStyles,
    containerClasses = "",
    containerStyles,
    inputsNumber,
    setStringCode,
    setSubmitStatus,
    separator,
    regex = /^[0-9]*$/ ,
  }: InputsConfig) => {
    const [items, setItems] = useState<ItemsType[]>([]);
    const [pasteStatus, setPasteStatus] = useState<boolean>(false);
    const [filledInputs, setFilledInputs] = useState<number>(0);
  
  
    useEffect(() => {
      const newArr: ItemsType[] = [];
      for (let i = 0; i < inputsNumber; i++) {
        newArr[i] = {
          id: i,
          value: "",
          reference: createRef<HTMLInputElement>(),
        };
      }
      setItems(newArr);
    }, [inputsNumber]);
  
    useEffect(() => {
      setFilledInputs(0)
      const values = items.map((value) => {
        return value.value;
      });
      setStringCode(values.join(""));
      items.map((value) => {
          if (value.value !== "" && value.value !== " ") {
            setFilledInputs((prev) => prev + 1);
          } else setFilledInputs(0);
        });
    }, [items]);
    
    useEffect(() => {
      if(setSubmitStatus){
        items.length !== 0 && filledInputs === items.length
        ? setSubmitStatus(false)
        : setSubmitStatus(true);
      }
    }, [filledInputs]);
  
    useEffect(() => {
      items.length > 0 && items[0].reference.current?.focus();
    }, [items.length]);
  
    const setCodeDigit = (inputValue: string, inputId: number) => {
      setItems((prev) => {
        const newItems = prev.map(({ value, id, reference }) => {
          if (id === inputId) {
            return { id, value: inputValue, reference };
          } else return { id, value, reference };
        });
        return newItems;
      });
    };
  
    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>, id: number) => {
      if (
        items.length <= inputsNumber &&
        !pasteStatus &&
        e.target.value.length < 2
      ) {
        checkDigits(e.target.value, id);
      }
    };
    const checkDigits = (
      digit: string,
      id: number,
    ) => {
      let enteredCharacter: string = digit;
      const checkDigit = regex.test(enteredCharacter);
      const nextSiblingElement = items[id + 1]?.reference.current;
      if (!checkDigit) {
        enteredCharacter = "";
      }
      digit && setCodeDigit(enteredCharacter, id);
      if (checkDigit && nextSiblingElement) {
        nextSiblingElement.focus();
        // nextSiblingElement.select();
      }
    };
  
    const inputKeyDownHandler = (
      e: KeyboardEvent<HTMLInputElement>,
      id: number
    ) => {
      const target = e.target as HTMLInputElement | null;
      const nextElement = items[id + 1]?.reference.current;
      if (
        target &&
        e.key !== "Backspace" &&
        Number(target.value) &&
        !String(nextElement?.value)
      ) {
        if(nextElement){
          nextElement.focus();
          nextElement.select()
        }
      }
      if (target && e.key === "Backspace") {
        const prevSibling = items[id - 1]?.reference.current;
        setCodeDigit("", id);
        if (!target.value && id > 0) setCodeDigit("", id - 1);
        if (!target.value && id === 0) setCodeDigit("", id);
        if(prevSibling){
          prevSibling.focus();
          prevSibling.select();
        }
      }
    };
    const handleClick  = (e: React.MouseEvent<HTMLInputElement , MouseEvent> ) => {
      e.currentTarget.select()
    }
    const inputPasteHandler = (e: ClipboardEvent<HTMLInputElement>) => {
      if (
        e.clipboardData &&
        e.clipboardData.getData("text").length === items.length
      ) {
        setPasteStatus(true);
        const enteredData = e.clipboardData.getData("text");
        enteredData.split("").forEach((value, index) => {
          checkDigits(value, index);
          index === items.length - 1 && setPasteStatus(false);
        });
      }
    };
    return (
      <div style={{...containerStyles}} className={`OTPcontainer ${containerClasses}`}>
        {items.map(({ value, id, reference }, key) => {
          return (
            <>
              <input
                style={{...inputsStyles}}
                ref={reference}
                onClick={(e : React.MouseEvent<HTMLInputElement, MouseEvent>)=>handleClick(e)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChangeHandler(e, id)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => inputKeyDownHandler(e, id)}
                onPaste={(e: React.ClipboardEvent<HTMLInputElement>
                    ) => inputPasteHandler(e)}
                value={value}
                key={`OTPInput_${id}`}
                inputMode="numeric"
                type="text"
                autoComplete="one-time-code"
                className={`OTPInputs ${inputsClasses}`}
              />
              {key < items.length - 1 && separator}
            </>
          );
        })}
      </div>
    );
  };
  
  
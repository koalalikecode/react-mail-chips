import { KeyboardEventHandler, useEffect, useRef, useState } from "react";
import "./ChipInput.styles.css";
import ChipInputProps from "./ChipInput.type";

const ChipInput = ({
  emails,
  setEmails,
  inputContainerClassName,
  inputValue,
  setInputValue,
  delimiters,
}: ChipInputProps) => {
  const [contentWidth, setContentWidth] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.clientWidth);
    }
  }, [inputValue]);

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const checkEmailExist = (email: string, emails: string[]) => {
    return emails.includes(email);
  };

  const handleInputKeyUp: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if ((delimiters as string[]).includes(event.key)) {
      if (validateEmail(inputValue)) {
        if (!checkEmailExist(inputValue, emails)) {
          setEmails([...emails, inputValue]);
          setInputValue("");
        }
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }
    } else if (event.key === "Backspace" && inputValue.length === 0) {
      setEmails(emails.slice(0, emails.length - 1));
    } else {
      setInputValue((event.target as HTMLInputElement).value);
    }
  };

  const handleInputBlur = () => {
    if (validateEmail(inputValue)) {
      if (!checkEmailExist(inputValue, emails)) {
        setEmails([...emails, inputValue]);
        setInputValue("");
      }
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };
  return (
    <div
      className={`chip-input-container ${inputContainerClassName}`}
      style={{
        flexBasis: contentWidth ? contentWidth + 2 : 0,
      }}
    >
      <input
        ref={inputRef}
        className="chip-input"
        type="text"
        onKeyUp={handleInputKeyUp}
        onBlur={handleInputBlur}
      />
      <span ref={contentRef} className="chip-input-content">
        {inputValue}
      </span>
    </div>
  );
};

export default ChipInput;

import { KeyboardEventHandler, useEffect, useRef, useState } from "react";
import "./ChipInput.styles.css";
import ChipInputProps from "./ChipInput.type";

const ChipInput = ({
  emails,
  setEmails,
  inputContainerClassName,
}: ChipInputProps) => {
  const [inputContent, setInputContent] = useState<string>("");
  const [contentWidth, setContentWidth] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);
  const delimiters = ["Enter", ",", ";"];

  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.clientWidth);
    }
  }, [inputContent]);

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const checkEmailExist = (email: string, emails: string[]) => {
    return emails.includes(email);
  };

  const handleInputKeyUp: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (delimiters.includes(event.key)) {
      if (validateEmail(inputContent)) {
        if (!checkEmailExist(inputContent, emails)) {
          setEmails([...emails, inputContent]);
          setInputContent("");
        }
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }
    } else if (event.key === "Backspace" && inputContent.length === 0) {
      setEmails(emails.slice(0, emails.length - 1));
    } else {
      setInputContent((event.target as HTMLInputElement).value);
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
      />
      <span ref={contentRef} className="chip-input-content">
        {inputContent}
      </span>
    </div>
  );
};

export default ChipInput;
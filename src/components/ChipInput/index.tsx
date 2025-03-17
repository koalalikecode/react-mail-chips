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
      const trimmedEmail = inputValue.trim();
      if (validateEmail(trimmedEmail)) {
        if (!checkEmailExist(trimmedEmail, emails)) {
          setEmails([...emails, trimmedEmail]);
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

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData("text");
    const currentInputWithPaste = inputValue + pastedText;
    // Try to handle the combined text as a complete email first
    if (
      validateEmail(currentInputWithPaste.trim()) &&
      !checkEmailExist(currentInputWithPaste.trim(), emails)
    ) {
      setEmails([...emails, currentInputWithPaste.trim()]);
      inputRef.current!.value = "";
      return;
    }

    // Then try to split by delimiters for multiple emails
    const potentialEmails = pastedText.split(/[\s,;]+/);

    const validEmails = potentialEmails
      .map((email) => email.trim())
      .filter(
        (email) =>
          email && validateEmail(email) && !checkEmailExist(email, emails)
      );

    if (validEmails.length > 0) {
      setEmails([...emails, ...validEmails]);
      setInputValue("");
    } else {
      // If no valid emails found, just append the pasted text to input
      inputRef.current!.value = currentInputWithPaste;
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
        onPaste={handlePaste}
      />
      <span ref={contentRef} className="chip-input-content">
        {inputValue}
      </span>
    </div>
  );
};

export default ChipInput;

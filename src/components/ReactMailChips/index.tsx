import { useState } from "react";
import Chip from "../Chip";
import ChipInput from "../ChipInput";
import "./ReactMailChips.styles.css";
import ReactMailChipsProps from "./ReactMailChips.type";

const ReactMailChips = ({
  emails,
  setEmails,
  className = "",
  chipClassName = "",
  inputContainerClassName = "",
  placeholder = "",
}: ReactMailChipsProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleDeleteChipByIndex = (index: number) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  const isPlaceHolderVisible =
    inputValue.length === 0 && emails.length === 0 && placeholder.length > 0;
  return (
    <div className={`react-mail-chips ${className}`}>
      {isPlaceHolderVisible && (
        <span className="placeholder">{placeholder}</span>
      )}
      {emails.map((email, index) => (
        <Chip
          key={email}
          content={email}
          className={chipClassName}
          deleteByIndex={(e) => {
            e.preventDefault();
            handleDeleteChipByIndex(index);
          }}
        />
      ))}
      <ChipInput
        emails={emails}
        setEmails={setEmails}
        inputValue={inputValue}
        setInputValue={setInputValue}
        inputContainerClassName={inputContainerClassName}
      />
    </div>
  );
};

export default ReactMailChips;

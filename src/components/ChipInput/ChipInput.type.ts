import { Delimiter } from "../ReactMailChips/ReactMailChips.type";
import { KeyboardEvent } from "react";

type ChipInputProps = {
  emails: string[];
  setEmails: (emails: string[]) => void;
  inputContainerClassName?: string;
  inputValue: string;
  inputRef: React.RefObject<HTMLInputElement>;
  setInputValue: (inputValue: string) => void;
  delimiters: Delimiter[];
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
};

export default ChipInputProps;

import { Delimiter } from "../ReactMailChips/ReactMailChips.type";

type ChipInputProps = {
  emails: string[];
  setEmails: (emails: string[]) => void;
  inputContainerClassName?: string;
  inputValue: string;
  inputRef: React.RefObject<HTMLInputElement>;
  setInputValue: (inputValue: string) => void;
  delimiters: Delimiter[];
};

export default ChipInputProps;

type ChipInputProps = {
  emails: string[];
  setEmails: (emails: string[]) => void;
  inputContainerClassName?: string;
  inputValue: string;
  setInputValue: (inputValue: string) => void;
};

export default ChipInputProps;

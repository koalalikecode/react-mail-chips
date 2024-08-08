type ReactMailChipsProps = {
  emails: string[];
  setEmails: (emails: string[]) => void;
  className?: string;
  chipClassName?: string;
  inputContainerClassName?: string;
  placeholder?: string;
  delimiters?: Delimiter[];
};

export type Delimiter =
  | ","
  | ";"
  | "Enter"
  | " "
  | "End"
  | "ArrowLeft"
  | "ArrowUp"
  | "ArrowRight"
  | "ArrowDown"
  | "Insert";

export default ReactMailChipsProps;

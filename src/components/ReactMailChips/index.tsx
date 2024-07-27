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
}: ReactMailChipsProps) => {
  const handleDeleteChipByIndex = (index: number) => {
    setEmails(emails.filter((_, i) => i !== index));
  };
  return (
    <div className={`react-mail-chips ${className}`}>
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
        inputContainerClassName={inputContainerClassName}
      />
    </div>
  );
};

export default ReactMailChips;

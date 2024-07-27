import "./Chip.styles.css";
import ChipProps from "./Chip.type";

const Chip = ({ content, className, deleteByIndex }: ChipProps) => {
  return (
    <span className={`chip ${className}`}>
      {content}
      <span className="remove-chip-btn" onClick={deleteByIndex}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          style={{ width: "14px", height: "14px" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </span>
    </span>
  );
};

export default Chip;

import { useEffect, useRef, useState } from "react";
import Chip from "../Chip";
import ChipInput from "../ChipInput";
import "./ReactMailChips.styles.css";
import ReactMailChipsProps from "./ReactMailChips.type";
import { checkEmailExist } from "../../utils";

const ReactMailChips = ({
  emails,
  setEmails,
  className = "",
  chipClassName = "",
  inputContainerClassName = "",
  placeholder = "",
  delimiters = ["Enter", ",", ";"],
  recommendedEmails = [],
}: ReactMailChipsProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [recommendationsPosition, setRecommendationsPosition] = useState<{
    left: number;
    top: number;
  } | null>(null);
  const chipInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [filteredRecommendations, setFilteredRecommendations] = useState<
    string[]
  >([]);

  const handleDeleteChipByIndex = (index: number) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (chipInputRef.current && inputValue && recommendedEmails?.length) {
      const position = chipInputRef.current?.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();

      if (position && containerRect) {
        setRecommendationsPosition({
          left: position.left - containerRect.left - 24,
          top: position.top - containerRect.top + 28,
        });
      } else {
        setRecommendationsPosition(position);
      }
    }
    if (inputValue && recommendedEmails?.length) {
      const filtered = recommendedEmails
        .filter(
          (email) =>
            email.toLowerCase().includes(inputValue.toLowerCase()) &&
            !checkEmailExist(email, emails)
        )
        .slice(0, 5); // Limit recommendations to 5

      setFilteredRecommendations(filtered);
      setShowRecommendations(filtered.length > 0);
    } else {
      setShowRecommendations(false);
    }
  }, [inputValue, JSON.stringify(recommendedEmails), , JSON.stringify(emails)]);

  const selectRecommendation = (email: string) => {
    setEmails([...emails, email]);
    setInputValue("");
    if (chipInputRef.current) {
      chipInputRef.current.value = "";
    }
    setShowRecommendations(false);
  };

  const isPlaceHolderVisible =
    inputValue.length === 0 && emails.length === 0 && placeholder.length > 0;
  return (
    <div className={`react-mail-chips ${className}`} ref={containerRef}>
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
      {showRecommendations && recommendationsPosition && (
        <div
          className="email-recommendations"
          style={{
            left: `${recommendationsPosition.left}px`,
            top: `${recommendationsPosition.top}px`,
          }}
        >
          {filteredRecommendations.map((email) => (
            <div
              key={email}
              className="email-recommendation-item"
              onMouseDown={(e) => {
                e.preventDefault();
                selectRecommendation(email);
              }}
            >
              {email}
            </div>
          ))}
        </div>
      )}
      <ChipInput
        emails={emails}
        setEmails={setEmails}
        inputValue={inputValue}
        inputRef={chipInputRef}
        setInputValue={setInputValue}
        inputContainerClassName={inputContainerClassName}
        delimiters={delimiters}
      />
    </div>
  );
};

export default ReactMailChips;

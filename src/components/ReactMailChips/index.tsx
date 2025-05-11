import { useEffect, useRef, useState, useCallback } from "react";
import Chip from "../Chip";
import ChipInput from "../ChipInput";
import RecommendationList from "../RecommendationList";
import { useKeyboardNavigation } from "../../hooks/useKeyboardNavigation";
import "./ReactMailChips.styles.css";
import ReactMailChipsProps from "./ReactMailChips.type";
import { checkEmailExist } from "../../utils";

// Constants
const MAX_RECOMMENDATIONS = 5;
const RECOMMENDATIONS_OFFSET = {
  LEFT: -24,
  TOP: 28,
} as const;

// Types
type RecommendationPosition = {
  left: number;
  top: number;
} | null;

/**
 * ReactMailChips component for handling email input with chips and recommendations
 */
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
  const [recommendationsPosition, setRecommendationsPosition] = useState<RecommendationPosition>(null);
  const chipInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [filteredRecommendations, setFilteredRecommendations] = useState<string[]>([]);

  const { selectedIndex, setSelectedIndex, handleKeyDown } = useKeyboardNavigation({
    showRecommendations,
    filteredRecommendations,
    onSelect: selectRecommendation,
    onClose: () => {
      setShowRecommendations(false);
      setSelectedIndex(-1);
    },
  });

  const handleDeleteChipByIndex = useCallback((index: number) => {
    setEmails(emails.filter((_, i) => i !== index));
  }, [emails, setEmails]);

  const updateRecommendationsPosition = useCallback(() => {
    if (!chipInputRef.current || !inputValue || !recommendedEmails?.length) return;

    const position = chipInputRef.current.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (position && containerRect) {
      setRecommendationsPosition({
        left: position.left - containerRect.left + RECOMMENDATIONS_OFFSET.LEFT,
        top: position.top - containerRect.top + RECOMMENDATIONS_OFFSET.TOP,
      });
    } else {
      setRecommendationsPosition(position);
    }
  }, [inputValue, recommendedEmails]);

  const updateFilteredRecommendations = useCallback(() => {
    if (!inputValue || !recommendedEmails?.length) {
      setShowRecommendations(false);
      return;
    }

    const filtered = recommendedEmails
      .filter(
        (email) =>
          email.toLowerCase().includes(inputValue.toLowerCase()) &&
          !checkEmailExist(email, emails)
      )
      .slice(0, MAX_RECOMMENDATIONS);

    setFilteredRecommendations(filtered);
    setShowRecommendations(filtered.length > 0);
    setSelectedIndex(-1);
  }, [inputValue, recommendedEmails, emails, setSelectedIndex]);

  useEffect(() => {
    updateRecommendationsPosition();
    updateFilteredRecommendations();
  }, [updateRecommendationsPosition, updateFilteredRecommendations]);

  function selectRecommendation(email: string) {
    if (!email || checkEmailExist(email, emails)) return;

    setEmails([...emails, email]);
    setInputValue("");
    if (chipInputRef.current) {
      chipInputRef.current.value = "";
    }
    setShowRecommendations(false);
    setSelectedIndex(-1);
  }

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
          <RecommendationList
            recommendations={filteredRecommendations}
            selectedIndex={selectedIndex}
            onSelect={selectRecommendation}
            onMouseEnter={setSelectedIndex}
          />
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
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default ReactMailChips;

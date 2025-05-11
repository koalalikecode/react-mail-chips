import { useEffect, useRef } from 'react';
import './RecommendationList.styles.css';

interface RecommendationListProps {
  recommendations: string[];
  selectedIndex: number;
  onSelect: (email: string) => void;
  onMouseEnter: (index: number) => void;
}

/**
 * Component to display a list of email recommendations with keyboard navigation support
 */
const RecommendationList = ({
  recommendations,
  selectedIndex,
  onSelect,
  onMouseEnter,
}: RecommendationListProps) => {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="email-recommendations-list" ref={listRef}>
      {recommendations.map((email, index) => (
        <div
          key={email}
          className={`email-recommendation-item ${index === selectedIndex ? 'selected' : ''}`}
          onMouseDown={(e) => {
            e.preventDefault();
            onSelect(email);
          }}
          onMouseEnter={() => onMouseEnter(index)}
        >
          {email}
        </div>
      ))}
    </div>
  );
};

export default RecommendationList; 
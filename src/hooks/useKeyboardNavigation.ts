import { useState } from 'react';

interface UseKeyboardNavigationProps {
  showRecommendations: boolean;
  filteredRecommendations: string[];
  onSelect: (email: string) => void;
  onClose: () => void;
}

interface UseKeyboardNavigationReturn {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

/**
 * Custom hook to handle keyboard navigation for email recommendations
 * @param showRecommendations - Whether recommendations are currently shown
 * @param filteredRecommendations - List of filtered email recommendations
 * @param onSelect - Callback when an email is selected
 * @param onClose - Callback when recommendations should be closed
 * @returns Object containing selectedIndex, setSelectedIndex, and handleKeyDown
 */
export const useKeyboardNavigation = ({
  showRecommendations,
  filteredRecommendations,
  onSelect,
  onClose,
}: UseKeyboardNavigationProps): UseKeyboardNavigationReturn => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showRecommendations) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev < filteredRecommendations.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < filteredRecommendations.length) {
          onSelect(filteredRecommendations[selectedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        onClose();
        break;
    }
  };

  return {
    selectedIndex,
    setSelectedIndex,
    handleKeyDown,
  };
}; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useUtilities(products) {
  // handle tooltip error display
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  const handleTooltipToggle = () => {
    setTooltipVisible(!isTooltipVisible);
  };

  // handle display and button functionality

  const [activeProductIndex, setActiveProductIndex] = useState(0);

  const handleNextProduct = () => {
    setActiveProductIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevProduct = () => {
    setActiveProductIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  // use navigate
  const navigate = useNavigate();

  return {
    handleMouseEnter,
    handleMouseLeave,
    handleTooltipToggle,
    isTooltipVisible,
    activeProductIndex,
    handleNextProduct,
    handlePrevProduct,
    setActiveProductIndex,
    navigate,
  };
}

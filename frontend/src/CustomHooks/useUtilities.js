import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useUtilities(products) {
  // // handle tooltip error display
  // const [isTooltipVisible, setTooltipVisible] = useState(false);

  // const handleMouseEnter = () => {
  //   setTooltipVisible(true);
  // };

  // const handleMouseLeave = () => {
  //   setTooltipVisible(false);
  // };

  // const handleTooltipToggle = () => {
  //   setTooltipVisible(!isTooltipVisible);
  // };

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

  const [showPassword1, setShowPassword1] = useState(true);
  const [showPassword2, setShowPassword2] = useState(true);
  const passwordInput = useRef();
  const confirmPasswordInput = useRef();

  useEffect(() => {
    togglePasswordVisibility1();
    togglePasswordVisibility2();
  }, []);

  const togglePasswordVisibility1 = () => {
    setShowPassword1((prevState) => !prevState);
    if (passwordInput.current != null) {
      passwordInput.current.querySelector("input").type = showPassword1
        ? "password"
        : "text";
    }
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2((prevState) => !prevState);
    if (confirmPasswordInput.current != null) {
      confirmPasswordInput.current.querySelector("input").type = showPassword2
        ? "password"
        : "type";
    }
  };

  return {
    // handleMouseEnter,
    // handleMouseLeave,
    // handleTooltipToggle,
    // isTooltipVisible,
    activeProductIndex,
    handleNextProduct,
    handlePrevProduct,
    setActiveProductIndex,
    navigate,
    togglePasswordVisibility1,
    passwordInput,
    togglePasswordVisibility2,
    confirmPasswordInput,
    showPassword1,
    showPassword2,
  };
}

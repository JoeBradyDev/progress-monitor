import { useCallback, useEffect, useState } from "react";

export const useEsc = () => {
  const [escPressed, setEscPressed] = useState(false);

  const handleKeyDown = useCallback((event: any) => {
    if (event.keyCode === 27) {
      setEscPressed(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return escPressed;
};

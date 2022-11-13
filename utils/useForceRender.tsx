import { useState } from "react";

export const useForceRender = () => {
  const [state, setState] = useState(true);

  const forceRender = () => {
    setState(!state);
  };

  return forceRender;
};

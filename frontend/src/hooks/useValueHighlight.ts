import { useRef, useState } from 'react';

export const useValueHighlight = (value: number) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const prevValue = useRef(value);

  if (prevValue.current !== value) {
    setIsHighlighted(true);
    prevValue.current = value;
    
    setTimeout(() => setIsHighlighted(false), 1500);
  }

  return isHighlighted;
};

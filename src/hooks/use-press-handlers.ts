import { useState, useCallback } from "react";

interface PressCallbacks {
  onPressStart?: () => void;
  onPressEnd?: () => void;
}

interface PressHandlers {
  onPressStart: (e: React.MouseEvent | React.TouchEvent) => void;
  onPressEnd: (e: React.MouseEvent | React.TouchEvent) => void;
  onLeaveElement: (e: React.MouseEvent | React.TouchEvent) => void;
}

const usePressHandlers = (
  callbacks: PressCallbacks,
  isEnabled: boolean = true,
): PressHandlers => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isEnabled) return;
      e.preventDefault();
      setIsPressed(true);
      callbacks.onPressStart?.();
    },
    [callbacks, isEnabled],
  );

  const handlePressEnd = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isEnabled || !isPressed) return;
      e.preventDefault();
      setIsPressed(false);
      callbacks.onPressEnd?.();
    },
    [callbacks, isPressed, isEnabled],
  );

  const handleLeaveElement = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isEnabled || !isPressed) return;
      e.preventDefault();
      setIsPressed(false);
      // Not calling onPressEnd here to mimic native button behavior
    },
    [isPressed, isEnabled],
  );

  return {
    onPressStart: handlePressStart,
    onPressEnd: handlePressEnd,
    onLeaveElement: handleLeaveElement,
  };
};

export default usePressHandlers;

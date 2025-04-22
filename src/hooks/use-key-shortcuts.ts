
import { useEffect } from "react";

interface KeyShortcutAction {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  action: () => void;
}

export function useKeyShortcuts(shortcuts: KeyShortcutAction[]) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      shortcuts.forEach((shortcut) => {
        if (
          event.key.toLowerCase() === shortcut.key.toLowerCase() &&
          (shortcut.ctrl === undefined || event.ctrlKey === shortcut.ctrl) &&
          (shortcut.alt === undefined || event.altKey === shortcut.alt) &&
          (shortcut.shift === undefined || event.shiftKey === shortcut.shift)
        ) {
          event.preventDefault();
          shortcut.action();
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [shortcuts]);
}

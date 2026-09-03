// Split Signal reminder: theme switching changes the canvas, not the identity; keep cobalt and hierarchy consistent.
import { FaMoon, FaSun } from "react-icons/fa6";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="theme-toggle"
      onClick={toggleTheme}
      type="button"
    >
      {isDark ? <FaSun aria-hidden="true" size={13} /> : <FaMoon aria-hidden="true" size={13} />}
    </button>
  );
}

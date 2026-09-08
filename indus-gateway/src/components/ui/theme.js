import { createContext, useContext } from "react";

/*
 * Band theme context — set by <Section theme="...">, read by theme-aware
 * primitives (Eyebrow, Button, Card) so they adapt to a dark vs. paper
 * band without every call site passing a prop. Any primitive can still
 * override with its own explicit `theme`/`variant` prop.
 *   "dark"   — navy band (default)
 *   "paper"  — light/editorial band
 *   "aurora" — gradient panel (treated as dark for text purposes)
 */
export const BandThemeContext = createContext("dark");

export function useBandTheme(override) {
  const ctx = useContext(BandThemeContext);
  return override || ctx;
}

/* True when the band renders light-on-paper text. */
export function isPaper(theme) {
  return theme === "paper";
}

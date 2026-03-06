import { createContext, useContext, useState, type ReactNode } from "react";

type ThemeMode = "light" | "dark" | "green" | "blue" | "purple";

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  themeColors: Record<ThemeMode, string>;
}

const themeColors: Record<ThemeMode, string> = {
  light: "bg-zinc-50",
  dark: "bg-zinc-950",
  green: "bg-emerald-50",
  blue: "bg-blue-50",
  purple: "bg-violet-50",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { ThemeProvider, useTheme };

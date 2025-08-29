"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

function getPreferredTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    const initial = getPreferredTheme();
    setTheme(initial);
    applyTheme(initial);

    const onSystemChange = (e: MediaQueryListEvent) => {
      const next = e.matches ? "dark" : "light";
      const stored = window.localStorage.getItem("theme");
      // Respect explicit user selection; change only if user hasn't chosen
      if (stored !== "light" && stored !== "dark") {
        setTheme(next);
        applyTheme(next);
      }
    };

    const media =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
    media?.addEventListener?.("change", onSystemChange);
    return () => media?.removeEventListener?.("change", onSystemChange);
  }, []);

  const toggleTheme = React.useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    try {
      window.localStorage.setItem("theme", next);
    } catch {}
  }, [theme]);

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={
        theme === "dark" ? "ライトテーマに切り替え" : "ダークテーマに切り替え"
      }
      onClick={toggleTheme}
      className="rounded-full hover:scale-[1.03] active:scale-[0.98] transition-transform"
    >
      {theme === "dark" ? (
        <Sun className="size-5" />
      ) : (
        <Moon className="size-5" />
      )}
    </Button>
  );
}

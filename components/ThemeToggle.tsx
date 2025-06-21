"use client";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Persist theme preference
    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", dark ? "dark" : "light");
    }
  }, [dark]);

  useEffect(() => {
    // On mount, check for saved theme
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("theme");
      if (saved === "dark") setDark(true);
      if (saved === "light") setDark(false);
    }
  }, []);

  return (
    <div className="fixed top-4 right-4 flex items-center gap-2 z-50">
      <span className="text-xs text-text-light dark:text-text-dark">Light</span>
      <Switch checked={dark} onCheckedChange={setDark} aria-label="Toggle theme" />
      <span className="text-xs text-text-light dark:text-text-dark">Dark</span>
    </div>
  );
}

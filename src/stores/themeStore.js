import { defineStore } from "pinia";
import { ref } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const isDark = ref(localStorage.getItem("theme") === "dark");

  const applyTheme = () => {
    document.body.classList.toggle("dark-mode", isDark.value);
    localStorage.setItem("theme", isDark.value ? "dark" : "light");
  };

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    applyTheme();
  };

  return {
    isDark,
    applyTheme,
    toggleTheme
  };
});
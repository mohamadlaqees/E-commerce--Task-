import "server-only";

const dictionaries = {
  en: () => import("@/locales/en/common.json").then((module) => module.default),
  ar: () => import("@/locales/ar/common.json").then((module) => module.default),
};

export const getDicitionary = async (locale: string) => {
  const chosenLocal = locale === "ar" ? "ar" : "en";
  return dictionaries[chosenLocal]();
};

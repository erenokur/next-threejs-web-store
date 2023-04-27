import { useTranslation } from "next-i18next";

const Header = () => {
  const { t, i18n } = useTranslation("translation", { useSuspense: false });

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center justify-between bg-gray py-4 px-6">
      <div className="text-lg font-bold">{t("headerTitle")}</div>
      <div>
        {i18n.language === "en" ? (
          <button
            className="mr-2 text-white"
            onClick={() => changeLanguage("tr")}
          >
            TR
          </button>
        ) : (
          <button
            className="mr-2 text-white"
            onClick={() => changeLanguage("en")}
          >
            EN
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;

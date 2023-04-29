import { useTranslation } from "next-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";

const Header = ({ hideLoggingInfo }: { hideLoggingInfo?: boolean }) => {
  const router = useRouter();
  const { t, i18n } = useTranslation("translation", { useSuspense: false });
  const { getUser, logout, user } = useAuth();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const logoutRequest = () => {
    console.log("logout");
    logout();
  };

  const loginRequest = () => {
    router.push("/login");
  };

  const gotoHome = () => {
    router.push("/");
  };
  const userChanged = () => {
    return (
      <div>
        {user ? (
          <button className="text-white ml-4" onClick={() => logoutRequest()}>
            {t("logoutButton")}
          </button>
        ) : (
          <button className="text-white ml-4" onClick={() => loginRequest()}>
            {t("loginButton")}
          </button>
        )}
      </div>
    );
  };
  return (
    <div className="flex items-center justify-between bg-gray py-4 px-6">
      <button
        className="text-lg font-bold"
        onClick={() => {
          gotoHome();
        }}
      >
        {t("headerTitle")}
      </button>
      <div className="flex items-center justify-between bg-gray py-4 px-4">
        {i18n.language === "en" ? (
          <div
            onClick={() => changeLanguage("tr")}
            className="flex items-center cursor-pointer"
          >
            <img
              src="images/TR.svg"
              alt="flag"
              className="w-6 h-6 pointer-events-none"
            />
            <button className="mr-2 text-white pointer-events-none">TR</button>
          </div>
        ) : (
          <div
            onClick={() => changeLanguage("en")}
            className="flex items-center cursor-pointer"
          >
            <img
              src="images/US.svg"
              alt="flag"
              className="w-6 h-6 pointer-events-none"
            />
            <button className="mr-2 text-white pointer-events-none">EN</button>
          </div>
        )}
        {hideLoggingInfo ? null : userChanged()}
        {user ? (
          <button className="text-white ml-4" onClick={() => logoutRequest()}>
            {user}
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Header;

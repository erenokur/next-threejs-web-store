import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const LoginPage = () => {
  const router = useRouter();
  const { login, getUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t, i18n } = useTranslation("translation", { useSuspense: false });

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await login(email, password);
      setTimeout(() => {
        toastify();
      }, 200);
    } catch (error) {
      console.log(error);
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const toastify = () => {
    if (getUser() != "") {
      toast("welcome " + getUser(), {
        hideProgressBar: true,
        autoClose: 2000,
        type: "success",
      });
      router.push("/");
    } else if (email != "" && password != "") {
      toast("Login Failed", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "error",
      });
    }
  };

  return (
    <div className="flex flex-col h-screen\">
      <div className="flex-1 flex items-center justify-center">
        <div className="flex h-screen bg-black-200">
          <div className="m-auto w-full max-w-md">
            <div className="text-3xl font-bold mb-4">{t("login")}</div>
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="email"
                >
                  {t("email")}
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder={t("enterEmail") || "Enter Email"}
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="password"
                >
                  {t("password")}
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder={t("enterPassword") || "Enter Password"}
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  {t("signIn")}
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => router.push("/register")}
                >
                  {t("register")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;

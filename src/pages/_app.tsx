import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { I18nextProvider } from "react-i18next";
import { AuthProvider } from "@/contexts/AuthContext";
import i18n from "@/i18n";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
    <I18nextProvider i18n={i18n}>
      <Component {...pageProps} />
    </I18nextProvider>
    </AuthProvider>
  );
}

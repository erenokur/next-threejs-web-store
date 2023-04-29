import SuspenseWrapper from "../components/suspenseWrapper";
import dynamic from "next/dynamic";
//import LoginPage from "../components/LoginPage";
export default function Home() {
  const LoginPage = dynamic(() => import("@/components/loginPage"), {
    ssr: false,
  });
  return (
    <SuspenseWrapper>
      <LoginPage />
    </SuspenseWrapper>
  );
}

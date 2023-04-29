import SuspenseWrapper from "../components/SuspenseWrapper";
import dynamic from "next/dynamic";
//import LoginPage from "../components/LoginPage";
export default function Home() {
  const LoginPage = dynamic(() => import("@/components/LoginPage"), {
    ssr: false,
  });
  return (
    <SuspenseWrapper>
      <LoginPage />
    </SuspenseWrapper>
  );
}

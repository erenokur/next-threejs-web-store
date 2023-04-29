import SuspenseWrapper from "@/components/SuspenseWrapper";
import dynamic from "next/dynamic";
export default function Home() {
  const LoginPage = dynamic(() => import("@/components/LoginPage"), {
    ssr: false,
  });
  const Header = dynamic(() => import("@/components/header"), {
    ssr: false,
  });
  return (
    <SuspenseWrapper>
      <div>
        <Header hideLoggingInfo={true} />
      </div>
      <LoginPage />
    </SuspenseWrapper>
  );
}

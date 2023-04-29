import SuspenseWrapper from "@/components/suspenseWrapper";
import dynamic from "next/dynamic";
export default function Home() {
  const LoginPage = dynamic(() => import("@/components/registerPage"), {
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

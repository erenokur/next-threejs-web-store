import SuspenseWrapper from "../components/SuspenseWrapper";
import LoginPage from "../components/LoginPage";
export default function Home() {
  return (
    <SuspenseWrapper>
      <LoginPage />
    </SuspenseWrapper>
  );
}

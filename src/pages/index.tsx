import SuspenseWrapper from "../components/SuspenseWrapper";
import WelcomePage from "../components/WelcomePage";
export default function Home() {
  return (
    <SuspenseWrapper>
      <WelcomePage />
    </SuspenseWrapper>
  );
}

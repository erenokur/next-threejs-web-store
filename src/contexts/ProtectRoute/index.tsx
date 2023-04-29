import { ReactNode, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";

interface Props {
  children: ReactNode;
}
// I made this component to protect the routes that need authentication
// but in the end I didn't use it because this class caused blank screen problems on firefox
export const ProtectRoute = ({ children }: Props) => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("user")) {
        router.push("/");
      }
    }
  }, [router, user]);

  return user ? <>{children}</> : <></>;
};

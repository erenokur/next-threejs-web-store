import { ReactNode, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";

interface Props {
  children: ReactNode;
}

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

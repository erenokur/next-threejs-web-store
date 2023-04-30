"use client";
import React, { useEffect } from "react";
import SuspenseWrapper from "@/components/suspenseWrapper";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
export default function Home() {
  const ProfilePage = dynamic(() => import("@/components/profilePage"), {
    ssr: false,
  });
  const Header = dynamic(() => import("@/components/header"), {
    ssr: false,
  });
  const { user, getUser } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (getUser()) {
      console.log("welcome: " + user);
    }
    console.log("user changed" + user);
  }, [user]);
  return (
    <SuspenseWrapper>
      <div>
        <Header />
      </div>
      <ProfilePage />
    </SuspenseWrapper>
  );
}

"use client";
import React, { useEffect } from "react";
import SuspenseWrapper from "@/components/suspenseWrapper";
import dynamic from "next/dynamic";
import { useAuth } from "@/contexts/AuthContext";
export default function Home() {
  const ProductList = dynamic(() => import("@/components/productList"), {
    ssr: false,
  });
  const Header = dynamic(() => import("@/components/header"), {
    ssr: false,
  });
  const { user, getUser } = useAuth();
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
      <ProductList />
    </SuspenseWrapper>
  );
}

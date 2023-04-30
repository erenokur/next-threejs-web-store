"use client";
import React, { Component, useEffect } from "react";
import SuspenseWrapper from "@/components/suspenseWrapper";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { productList } from "@/components/productList/tempProducts";
export default function Product() {
  const router = useRouter();
  const { productId } = router.query;
  const ProductViewPage = dynamic(
    () => import("@/components/productViewPage"),
    {
      ssr: false,
    }
  );
  const Header = dynamic(() => import("@/components/header"), {
    ssr: false,
  });
  const product = productList.find((item) => item.id === Number(productId));
  return (
    <SuspenseWrapper>
      <div>
        <Header />
      </div>
      <ProductViewPage />
    </SuspenseWrapper>
  );
}

import React from "react";

interface Props {
  children: React.ReactNode;
}

const SuspenseWrapper: React.FC<Props> = ({ children }) => (
  <React.Suspense fallback={<div>Loading...</div>}>{children}</React.Suspense>
);
export default SuspenseWrapper;

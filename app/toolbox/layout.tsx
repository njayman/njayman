import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Najish Mahmud",
  description: "Najish Mahmud | Toolbox",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

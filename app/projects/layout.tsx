import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Najish Mahmud | Projects",
  description: "Najish Mahmud | Projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Najish Mahmud | Thoughts",
  description: "Najish Mahmud | Thoughts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

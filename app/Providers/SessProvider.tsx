"use client";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

export default function SessProvider({ children }: any) {
  return <SessionProvider>{children}</SessionProvider>;
}

"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface SessionProviderProps {
  children: ReactNode;
  session?: any;
}

const CustomSessionProvider = ({ children, session }: SessionProviderProps) => (
  <SessionProvider session={session}>{children}</SessionProvider>
);

export default CustomSessionProvider;

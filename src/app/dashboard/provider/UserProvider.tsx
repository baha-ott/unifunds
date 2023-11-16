"use client";
import { createContext, useContext, useState } from "react";

export const UserContext = createContext({ role: "" });

export function UserProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: any;
}) {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

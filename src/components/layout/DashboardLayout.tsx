"use client";

import { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: Props) {
  return (
    <div className="bg-[#F8F8F8] min-h-screen">
      <Sidebar />

      <div className="ml-64 text-black">
        <Header />

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
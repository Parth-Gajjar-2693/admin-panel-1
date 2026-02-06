import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex bg-bg">
      {/* Sidebar */}
      <aside className="sticky top-0 h-screen">
        <Sidebar />
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

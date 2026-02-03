import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

type Props = {
  children: ReactNode;
  isLoading?: boolean;
};

export default function MainLayout({ children, isLoading }: Props) {
  return (
    <div className="flex min-h-screen bg-bg text-text">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />

        <main className="relative flex-1 p-6">
          {/* Loader overlay */}
          {isLoading && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          )}

          {children}
        </main>
      </div>
    </div>
  );
}

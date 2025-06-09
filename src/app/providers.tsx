"use client";
// core
import { ReactNode } from "react";
// config
import { queryClient } from "@/lib/react-query";
// provider
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
// toast
import { Toaster } from "sonner";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
        <Toaster position="bottom-right" richColors closeButton />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

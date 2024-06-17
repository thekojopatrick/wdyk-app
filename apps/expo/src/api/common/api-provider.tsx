//import { useReactQueryDevTools } from '@dev-plugins/react-query';
import * as React from "react";
import { TRPCProvider } from "@/lib/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export function APIProvider({ children }: { children: React.ReactNode }) {
  //useReactQueryDevTools(queryClient);
  return (
    // Provide the client to your App
    <TRPCProvider>{children}</TRPCProvider>
  );
}

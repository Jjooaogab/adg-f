"use client";

import { queryClient } from "@/config/Config";
import OrderIdContext from "@/context/orderId";
import { QueryClientProvider } from "react-query";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
          {children}
      </QueryClientProvider>
    </>
  );
};

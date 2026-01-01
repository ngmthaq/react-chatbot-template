import type { FC, PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./queryClient";

export const AppQueryProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {import.meta.env.DEV && (
        <>
          <style>
            {`.tsqd-open-btn-container {
                bottom: 52px;
              }`}
          </style>
          <ReactQueryDevtools client={queryClient} initialIsOpen={false} />
        </>
      )}
    </QueryClientProvider>
  );
};

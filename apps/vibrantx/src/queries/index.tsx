import { request } from "@/config/request";
import {
  QueryClientProvider as Providers,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: ({ queryKey }) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return request(queryKey[0] as any);
      },
      staleTime: 6000,
    },
  },
});

export default function QueryClientProvider({
  children, // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: React.PropsWithChildren<Record<string, any>>) {
  return <Providers client={queryClient}>{children}</Providers>;
}

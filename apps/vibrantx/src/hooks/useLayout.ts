import { LAYOUT_STORAGE_KEY, initialStateLayout } from "@/utils/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocalStorage } from "react-use";

export const useLayout = () => {
  const [locale, ...rest] = useLocalStorage(
    LAYOUT_STORAGE_KEY,
    initialStateLayout
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.setQueryData([LAYOUT_STORAGE_KEY], () => {
      return locale;
    });
  }, [locale, queryClient]);

  const { data } = useQuery({
    queryKey: [LAYOUT_STORAGE_KEY],
    queryFn: (data: any) => data,
    initialData: locale,
    enabled: false,
  });

  return [data ?? initialStateLayout, ...rest] as const;
};

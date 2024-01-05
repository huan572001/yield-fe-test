import { LAYOUT_STORAGE_KEY, initialStateLayout } from "@/utils/constants";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
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

  const { data } = useQuery([LAYOUT_STORAGE_KEY], {
    select: (data) => data,
    initialData: () => locale,
    enabled: false,
  });

  return [data ?? initialStateLayout, ...rest] as const;
};

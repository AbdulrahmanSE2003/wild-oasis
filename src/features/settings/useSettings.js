import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings(newSettingsOptions) {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["setting"],
    queryFn: () => getSettings(newSettingsOptions),
  });

  return { isLoading, error, settings };
}

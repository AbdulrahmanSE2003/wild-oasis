import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter
  const status = searchParams.get("status");
  const filter =
    !status || status === "all"
      ? null
      : { field: "status", value: status, method: "eq" };

  // Sort
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // Page (derived from URL)
  let page = Number(searchParams.get("page") || 1);

  // Query
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // Correct page if it exceeds pageCount
  const pageCount = count ? Math.ceil(count / PAGE_SIZE) : 1;
  if (page > pageCount && pageCount > 0) {
    page = 1;
    // Update URL without pushing history
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    setSearchParams(params, { replace: true });
  }

  // Prefetch next & previous pages
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return { isLoading, error, bookings, count, page, pageCount };
}

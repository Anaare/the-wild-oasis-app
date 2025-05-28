import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // 1. Filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };

  // 2. Sort
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // 3. Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // 4. Query
  const { isPending, data, error } = useQuery({
    queryKey: ["bookings", filter, sortBy, page], // works like dependency array of useEffect, by adding everything that needs updating
    queryFn: () => getBookings({ filter, sortBy, page }),
  });
  const bookings = data?.data ?? [];
  const count = data?.count ?? 0;

  // Pre-fetching
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1], // works like dependency array of useEffect, by adding everything that needs updating
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1], // works like dependency array of useEffect, by adding everything that needs updating
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isPending, bookings, error, count };
}

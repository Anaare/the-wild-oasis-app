import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";

export function useGetGuests() {
  return useQuery({
    queryKey: ["guests"],
    queryFn: getGuests,
    onError: (err) => toast.error(err.message),
  });
}

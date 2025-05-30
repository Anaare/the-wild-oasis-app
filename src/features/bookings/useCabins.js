import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import getCabins from "../../services/apiCabins";

export function useGetCabins() {
  return useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
    onError: (err) => toast.error(err.message),
  });
}

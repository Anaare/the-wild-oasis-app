import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createNewBooking } from "../../services/apiBookings";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  const { mutate: createBooking, isPending: isCreating } = useMutation({
    mutationFn: createNewBooking,
    onSuccess: () => {
      toast.success("New booking successfully created");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createBooking };
}

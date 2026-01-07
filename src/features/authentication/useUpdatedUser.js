import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserSettings } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdatedUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateUserSettings,
    onSuccess: () => {
      toast.success("User data updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: () => {
      toast.error("Failed to update user");
    },
  });

  return { updateUser, isUpdating };
}

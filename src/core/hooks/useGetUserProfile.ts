import { useQuery, queryOptions } from "@tanstack/react-query";
import { queryKeys } from "@/core/constants/queryKeys";
import { authService } from "@/services/authService";
import { userProfileSchema } from "../schemas/authSchema";

export const getUserProfileOptions = queryOptions({
  queryKey: queryKeys.auth.profile(),
  queryFn: async () => {
    const response = await authService.getUserProfilele();
    return await userProfileSchema.validate(response);
  },
});

export const useGetUserProfile = (enabled = true) => {
  return useQuery({ ...getUserProfileOptions, enabled });
};

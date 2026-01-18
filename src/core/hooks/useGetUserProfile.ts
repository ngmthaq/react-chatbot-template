import { queryOptions, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { userProfileSchema } from "../schemas";
import { authService } from "../services";

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

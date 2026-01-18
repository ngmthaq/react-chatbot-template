import { queryOptions, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { authService } from "../services";

export const checkAuthOptions = queryOptions({
  queryKey: queryKeys.auth.check(),
  queryFn: async () => {
    const response = await authService.checkAuth();
    return response;
  },
});

export const useCheckAuth = (enabled = true) => {
  return useQuery({ ...checkAuthOptions, enabled });
};

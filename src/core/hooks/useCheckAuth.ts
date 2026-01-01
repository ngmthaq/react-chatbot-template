import { useQuery, queryOptions } from "@tanstack/react-query";
import { queryKeys } from "@/core/constants/queryKeys";
import { authService } from "@/services/authService";

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

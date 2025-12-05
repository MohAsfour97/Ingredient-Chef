
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import type { User } from '@shared/schema';

export function useAuth() {
  const { data: user, isLoading, error, refetch } = useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await api.get('/api/auth/user');
      return response.data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
    refetch,
  };
}

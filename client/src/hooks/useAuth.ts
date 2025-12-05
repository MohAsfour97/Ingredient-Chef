
import { useQuery } from '@tanstack/react-query';
import type { User } from '@shared/schema';

export function useAuth() {
  const { data: user, isLoading, error, refetch } = useQuery<User | null>({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/auth/user', {
          credentials: 'include',
        });
        
        if (!response.ok) {
          return null;
        }
        
        return response.json();
      } catch (err) {
        return null;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
    refetch,
  };
}

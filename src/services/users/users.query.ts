// External libs
import { useQuery } from '@tanstack/react-query';

// Services
import { getUser } from './users.service';

// DTOs
import { type User } from './users.props';

export const useUser = (id?: string) =>
  useQuery<User>({
    queryKey: ['user', id],
    queryFn: () => getUser(id as string),
    enabled: !!id,
  });

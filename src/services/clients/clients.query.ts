// External libs
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type Client } from './clients.props';

// Services
import {
  listClients,
  getClient,
  createClient,
  updateClient,
} from './clients.service';

// DTOs
import {
  type ClientListResponse,
  type ClientQueryDto,
  type UpdateClientDto,
} from './clients.props';

export const useListClients = (query: ClientQueryDto) =>
  useQuery<ClientListResponse>({
    queryKey: ['clients', query],
    queryFn: () => listClients(query),
    keepPreviousData: true,
  });

export const useClient = (id?: string) =>
  useQuery<Client>({
    queryKey: ['client', id],
    queryFn: () => getClient(id as string),
    enabled: !!id,
  });

export const useCreateClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });
};

export const useUpdateClient = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateClientDto) => updateClient(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['client', id] });
      void queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });
};

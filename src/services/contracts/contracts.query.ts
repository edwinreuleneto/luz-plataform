// External libs
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Services
import { listContracts, createContract } from './contracts.service';

// DTOs
import {
  type Contract,
  type ContractQueryDto,
} from './contracts.props';

export const useListContracts = (query: ContractQueryDto) =>
  useQuery<Contract[]>({
    queryKey: ['contracts', query],
    queryFn: () => listContracts(query),
    enabled: Object.values(query).some(Boolean),
  });

export const useCreateContract = (clientId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { title: string; fileId: string }) =>
      createContract({ ...data, clientId }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['contracts', { clientId }] });
    },
  });
};

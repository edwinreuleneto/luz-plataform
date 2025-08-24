// External libs
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Services
import {
  listContracts,
  createContract,
  uploadContractFile,
  linkContractToClient,
} from './contracts.service';

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
    mutationFn: async (data: { title: string; organizationId: string; file: File }) => {
      const uploaded = await uploadContractFile(clientId, data.file);
      const extension = data.file.name.split('.')?.pop() ?? '';
      const contract = await createContract({
        title: data.title,
        organizationId: data.organizationId,
        clientId,
        file: {
          ...uploaded,
          name: data.file.name,
          extension,
        },
      });
      return contract;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['contracts', { clientId }] });
    },
  });
};

export const useLinkContract = (clientId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { title: string; fileId: string }) =>
      linkContractToClient({ ...data, clientId }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['contracts', { clientId }] });
    },
  });
};

// External libs
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Services
import {
  listContracts,
  createContract,
  uploadContractFile,
  updateContractFile,
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
      const contract = await createContract({
        title: data.title,
        organizationId: data.organizationId,
        clientId,
      });
      const fileId = await uploadContractFile(clientId, data.file);
      await updateContractFile(contract.id, fileId);
      return contract;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['contracts', { clientId }] });
    },
  });
};

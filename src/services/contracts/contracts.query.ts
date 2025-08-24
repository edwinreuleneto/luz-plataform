// External libs
import { useQuery } from '@tanstack/react-query';

// Services
import { listContracts } from './contracts.service';

// DTOs
import { type Contract, type ContractQueryDto } from './contracts.props';

export const useListContracts = (query: ContractQueryDto) =>
  useQuery<Contract[]>({
    queryKey: ['contracts', query],
    queryFn: () => listContracts(query),
    enabled: Object.values(query).some(Boolean),
  });

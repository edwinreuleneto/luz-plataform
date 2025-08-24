"use client";

// External libs
import { useState } from "react";
import { File as FileIcon, FileImage, FileText, Plus } from "lucide-react";

// Services
import { useCreateContract } from "@/services/contracts";

// Components
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ContractForm from "./contract-form";

// DTOs
import type { ClientContractsProps } from "./client-contracts-props";

// Utils
const getIcon = (ext?: string) => {
  switch (ext) {
    case "pdf":
      return FileText;
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
      return FileImage;
    default:
      return FileIcon;
  }
};

const ClientContracts = ({ contracts, clientId }: ClientContractsProps) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync: createContract, isPending } = useCreateContract(clientId);

  const handleSubmit = async ({
    title,
    fileId,
  }: {
    title: string;
    fileId: string;
  }) => {
    await createContract({ title, fileId });
    setOpen(false);
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-end">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 size-4" />
                Adicionar contrato
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Novo contrato</DialogTitle>
              </DialogHeader>
              <ContractForm onSubmit={handleSubmit} loading={isPending} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">
          {contracts.map((contract) => {
            const Icon = getIcon(contract.file.extension);
            return (
              <div
                key={contract.id}
                className="flex flex-col items-center text-center"
              >
                <div className="bg-muted rounded-md p-4 transition hover:shadow-md">
                  <Icon className="size-10 text-primary" />
                </div>
                <span className="mt-2 w-full truncate text-sm">
                  {contract.file.name ?? contract.label}
                </span>
              </div>
            );
          })}
          {contracts.length === 0 ? (
            <p className="col-span-full text-center text-sm text-muted-foreground">
              Nenhum contrato vinculado
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientContracts;

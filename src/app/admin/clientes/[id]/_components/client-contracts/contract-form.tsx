"use client";

// External libs
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

// Components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Services
import { uploadFile } from "@/services/files";

// DTOs
import {
  contractFormSchema,
  type ContractFormProps,
  type ContractFormSchema,
} from "./contract-form-props";

const ContractForm = ({ onSubmit, loading }: ContractFormProps) => {
  const [uploading, setUploading] = useState(false);
  const form = useForm<ContractFormSchema>({
    resolver: zodResolver(contractFormSchema),
    defaultValues: { title: "", fileId: "" },
  });

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: { onChange: (value: string) => void },
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const { id } = await uploadFile(file);
        field.onChange(id);
      } catch (error) {
        console.error(error);
      } finally {
        setUploading(false);
      }
    }
  };

  const submit = async (values: ContractFormSchema) => {
    await onSubmit(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fileId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Arquivo</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="application/pdf,image/*"
                  disabled={uploading}
                  onChange={(e) => handleFileChange(e, field)}
                />
              </FormControl>
              {uploading ? (
                <p className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
                  <Loader2 className="size-3 animate-spin" /> Enviando...
                </p>
              ) : field.value ? (
                <p className="text-muted-foreground mt-1 text-xs">Arquivo enviado</p>
              ) : null}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={loading || uploading}>
          Salvar
        </Button>
      </form>
    </Form>
  );
};

export default ContractForm;

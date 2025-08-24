"use client";

// External libs
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

// Services
import { uploadFile } from "@/app/services/files";

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
import { MaskedInput } from "@/components/ui/masked-input";
import { Textarea } from "@/components/ui/textarea";

// Utils
import { maskCpf, maskCnpj, maskPhone, unmask } from "@/utils/masks";

// DTOs
import {
  clientFormSchema,
  type ClientFormProps,
  type ClientFormSchema,
} from "./client-form-props";

const ClientForm = ({
  initialData,
  onSubmit,
  submitLabel = "Salvar",
}: ClientFormProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const form = useForm<ClientFormSchema>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      personType: "PF",
      ...initialData,
    },
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

  const submit = async (values: ClientFormSchema) => {
    setSubmitting(true);
    try {
      await onSubmit({
        ...values,
        cpf: unmask(values.cpf),
        cnpj: unmask(values.cnpj),
        phone: unmask(values.phone),
      });
    } finally {
      setSubmitting(false);
    }
  };

  const personType = form.watch("personType");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="flex h-full flex-col">
        <div className="flex-1 space-y-4">
          {personType === "PF" ? (
            <>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <MaskedInput mask={maskCpf} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : (
            <>
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Razão social</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNPJ</FormLabel>
                    <FormControl>
                      <MaskedInput mask={maskCnpj} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <MaskedInput mask={maskPhone} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notas</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="logoFileId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    disabled={uploading}
                    onChange={(e) => handleFileChange(e, field)}
                  />
                </FormControl>
                {uploading ? (
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Loader2 className="size-3 animate-spin" /> Enviando...
                  </p>
                ) : field.value ? (
                  <p className="mt-1 text-xs text-muted-foreground">Arquivo enviado</p>
                ) : null}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="sticky bottom-0 bg-background pt-4">
          <Button
            type="submit"
            disabled={submitting || uploading}
            className="w-full"
          >
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ClientForm;

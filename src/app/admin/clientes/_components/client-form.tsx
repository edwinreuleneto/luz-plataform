"use client";

// External libs
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Utils
import { maskCpf, maskCnpj, maskPhone, unmask } from "@/utils/masks";

// DTOs
  export const clientFormSchema = z
    .object({
      personType: z.enum(["PF", "PJ"]),
      fullName: z.string().optional(),
      companyName: z.string().optional(),
      cpf: z.string().optional(),
      cnpj: z.string().optional(),
      email: z.string().email().optional(),
      phone: z.string().optional(),
      website: z.string().optional(),
      notes: z.string().optional(),
      logoFileId: z.string().uuid().optional(),
    })
  .refine(
    (data) =>
      (data.personType === "PF" && data.fullName) ||
      (data.personType === "PJ" && data.companyName),
    {
      message: "Nome é obrigatório",
      path: ["fullName"],
    }
  );

interface ClientFormProps {
  initialData?: Partial<z.infer<typeof clientFormSchema>>;
  onSubmit: (values: z.infer<typeof clientFormSchema>) => Promise<void>;
  submitLabel?: string;
}

  const ClientForm = ({
    initialData,
    onSubmit,
    submitLabel = "Salvar",
  }: ClientFormProps) => {
    const [submitting, setSubmitting] = useState(false);
    const [uploading, setUploading] = useState(false);
    const form = useForm<z.infer<typeof clientFormSchema>>({
      resolver: zodResolver(clientFormSchema),
      defaultValues: {
        personType: "PF",
        ...initialData,
      },
    });

    const handleFileChange = async (
      e: React.ChangeEvent<HTMLInputElement>,
      field: { onChange: (value: string) => void }
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

    const submit = async (values: z.infer<typeof clientFormSchema>) => {
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
        <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
          <FormField
            control={form.control}
            name="personType"
            render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Pessoa</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PF">Pessoa Física</SelectItem>
                  <SelectItem value="PJ">Pessoa Jurídica</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
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
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Loader2 className="size-3 animate-spin" /> Enviando...
                </p>
              ) : field.value ? (
                <p className="text-xs text-muted-foreground mt-1">Arquivo enviado</p>
              ) : null}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={submitting || uploading}>
          {submitLabel}
        </Button>
      </form>
    </Form>
  );
};

export default ClientForm;

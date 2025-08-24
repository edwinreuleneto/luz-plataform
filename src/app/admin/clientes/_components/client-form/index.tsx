"use client";

// External libs
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

// Services
import { uploadFile } from "@/services/files";

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
  const fieldStyles =
    "bg-white px-3 pt-2.5 pb-1.5 outline-1 -outline-offset-1 outline-gray-300 focus-within:relative focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 dark:bg-white/5 dark:outline-gray-700 dark:focus-within:outline-indigo-500";
  const inputStyles =
    "block w-full text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 dark:bg-transparent dark:text-white dark:placeholder:text-gray-500";
  const labelStyles =
    "block text-xs font-medium text-gray-900 dark:text-gray-200";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className="flex h-full flex-col"
      >
        <div className="flex-1 space-y-4">
          {personType === "PF" ? (
            <div className="-space-y-px">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className={`rounded-t-md ${fieldStyles}`}>
                    <FormLabel className={labelStyles}>Nome completo</FormLabel>
                    <FormControl>
                      <Input {...field} className={inputStyles} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem className={`rounded-b-md ${fieldStyles}`}>
                    <FormLabel className={labelStyles}>CPF</FormLabel>
                    <FormControl>
                      <MaskedInput
                        mask={maskCpf}
                        {...field}
                        className={inputStyles}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ) : (
            <div className="-space-y-px">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem className={`rounded-t-md ${fieldStyles}`}>
                    <FormLabel className={labelStyles}>Razão social</FormLabel>
                    <FormControl>
                      <Input {...field} className={inputStyles} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem className={`rounded-b-md ${fieldStyles}`}>
                    <FormLabel className={labelStyles}>CNPJ</FormLabel>
                    <FormControl>
                      <MaskedInput
                        mask={maskCnpj}
                        {...field}
                        className={inputStyles}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <div className="-space-y-px">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className={`rounded-t-md ${fieldStyles}`}>
                  <FormLabel className={labelStyles}>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      className={inputStyles}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className={`rounded-b-md ${fieldStyles}`}>
                  <FormLabel className={labelStyles}>Telefone</FormLabel>
                  <FormControl>
                    <MaskedInput
                      mask={maskPhone}
                      {...field}
                      className={inputStyles}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="-space-y-px">
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem className={`rounded-t-md ${fieldStyles}`}>
                  <FormLabel className={labelStyles}>Website</FormLabel>
                  <FormControl>
                    <Input {...field} className={inputStyles} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem className={`rounded-b-md ${fieldStyles}`}>
                  <FormLabel className={labelStyles}>Notas</FormLabel>
                  <FormControl>
                    <Textarea {...field} className={inputStyles} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="-space-y-px">
            <FormField
              control={form.control}
              name="logoFileId"
              render={({ field }) => (
                <FormItem className={`rounded-md ${fieldStyles}`}>
                  <FormLabel className={labelStyles}>Logo</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      disabled={uploading}
                      onChange={(e) => handleFileChange(e, field)}
                      className={inputStyles}
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
          </div>
        </div>
        <div className="bg-background sticky bottom-0 pt-4">
          <Button
            type="submit"
            disabled={submitting || uploading}
            className="w-full"
            size="lg"
          >
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ClientForm;

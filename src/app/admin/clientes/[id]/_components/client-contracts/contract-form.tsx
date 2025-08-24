"use client";

// External libs
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

// DTOs
import {
  contractFormSchema,
  type ContractFormProps,
  type ContractFormSchema,
} from "./contract-form-props";

const ContractForm = ({ onSubmit, loading }: ContractFormProps) => {
  const form = useForm<ContractFormSchema>({
    resolver: zodResolver(contractFormSchema),
    defaultValues: { title: "" },
  });

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
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Arquivo</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="application/pdf,image/*"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          Salvar
        </Button>
      </form>
    </Form>
  );
};

export default ContractForm;

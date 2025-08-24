// External libs
import { Paperclip } from "lucide-react";

// DTOs
import type { ClientProfileProps } from "./client-profile-props";

const ClientProfile = ({ client }: ClientProfileProps) => {
  return (
    <div className="px-4">
      <div className="mb-6 border-b border-gray-200 pb-6 sm:px-0">
        <h3 className="text-primary text-lg font-semibold dark:text-white">
          Informações do cliente
        </h3>
        <p className="text-md max-w-2xl text-gray-500 dark:text-gray-400">
          Detalhes do cliente.
        </p>
      </div>
      <div>
        <dl className="grid grid-cols-1 sm:grid-cols-2">
          <div className="px-4 py-4 sm:col-span-1 sm:px-0 dark:border-white/10">
            <dt className="text-md font-semibold text-gray-900 dark:text-white">
              Tipo de pessoa
            </dt>
            <dd className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {client.personType}
            </dd>
          </div>
          <div className="px-4 py-4 sm:col-span-1 sm:px-0 dark:border-white/10">
            <dt className="text-md font-semibold text-gray-900 dark:text-white">
              Documento
            </dt>
            <dd className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {client.cpf ?? client.cnpj ?? "-"}
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-4 sm:col-span-1 sm:px-0 dark:border-white/10">
            <dt className="text-md font-semibold text-gray-900 dark:text-white">
              Email
            </dt>
            <dd className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {client.email ?? "-"}
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-4 sm:col-span-1 sm:px-0 dark:border-white/10">
            <dt className="text-md font-semibold text-gray-900 dark:text-white">
              Telefone
            </dt>
            <dd className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {client.phone ?? "-"}
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-4 sm:col-span-2 sm:px-0 dark:border-white/10">
            <dt className="text-md font-semibold text-gray-900 dark:text-white">
              Website
            </dt>
            <dd className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {client.website ?? "-"}
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-4 sm:col-span-2 sm:px-0 dark:border-white/10">
            <dt className="text-md font-semibold text-gray-900 dark:text-white">
              Notas
            </dt>
            <dd className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {client.notes ?? "-"}
            </dd>
          </div>
          {client.contacts?.length ? (
            <div className="border-t border-gray-100 px-4 py-4 sm:col-span-2 sm:px-0 dark:border-white/10">
              <dt className="text-md font-semibold text-gray-900 dark:text-white">
                Contatos
              </dt>
              <dd className="mt-2 text-sm text-gray-900 dark:text-white">
                <ul
                  role="list"
                  className="divide-y divide-gray-100 rounded-md border border-gray-200 dark:divide-white/5 dark:border-white/10"
                >
                  {client.contacts.map((contact) => (
                    <li
                      key={contact.id}
                      className="text-md flex items-center justify-between py-4 pr-5 pl-4"
                    >
                      <div className="flex w-0 flex-1 items-center">
                        <Paperclip
                          aria-hidden="true"
                          className="size-5 shrink-0 text-gray-400 dark:text-gray-500"
                        />
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-semibold text-gray-900 dark:text-white">
                            {contact.name}
                          </span>
                          {contact.email ? (
                            <span className="shrink-0 text-gray-400 dark:text-gray-500">
                              {contact.email}
                            </span>
                          ) : null}
                          {contact.phone ? (
                            <span className="shrink-0 text-gray-400 dark:text-gray-500">
                              {contact.phone}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ) : null}
          {client.addresses?.length ? (
            <div className="border-t border-gray-100 px-4 py-4 sm:col-span-2 sm:px-0 dark:border-white/10">
              <dt className="text-md font-semibold text-gray-900 dark:text-white">
                Endereços
              </dt>
              <dd className="mt-2 text-sm text-gray-900 dark:text-white">
                <ul
                  role="list"
                  className="divide-y divide-gray-100 rounded-md border border-gray-200 dark:divide-white/5 dark:border-white/10"
                >
                  {client.addresses.map((address) => (
                    <li
                      key={address.id}
                      className="text-md flex items-center justify-between py-4 pr-5 pl-4"
                    >
                      <div className="flex w-0 flex-1 items-center">
                        <Paperclip
                          aria-hidden="true"
                          className="size-5 shrink-0 text-gray-400 dark:text-gray-500"
                        />
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-semibold text-gray-900 dark:text-white">
                            {address.street}
                          </span>
                          <span className="shrink-0 text-gray-400 dark:text-gray-500">
                            {[address.city, address.state, address.zipCode]
                              .filter(Boolean)
                              .join(", ")}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ) : null}
        </dl>
      </div>
    </div>
  );
};

export default ClientProfile;

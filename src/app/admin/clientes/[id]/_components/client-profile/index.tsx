// External libs
import { PaperClipIcon } from "@heroicons/react/20/solid";

// DTOs
import type { ClientProfileProps } from "./client-profile-props";

const ClientProfile = ({ client }: ClientProfileProps) => {
  return (
    <>
      <div className="px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-gray-900 dark:text-white">
          Informações do cliente
        </h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500 dark:text-gray-400">
          Detalhes do cliente.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100 dark:border-white/10">
        <dl className="divide-y divide-gray-100 dark:divide-white/10">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">Email</dt>
            <dd className="mt-1 flex text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-gray-400">
              <span className="grow">{client.email ?? "-"}</span>
              <span className="ml-4 shrink-0">
                <button
                  type="button"
                  className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 dark:bg-transparent dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Atualizar
                </button>
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">Telefone</dt>
            <dd className="mt-1 flex text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-gray-400">
              <span className="grow">{client.phone ?? "-"}</span>
              <span className="ml-4 shrink-0">
                <button
                  type="button"
                  className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 dark:bg-transparent dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Atualizar
                </button>
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">Website</dt>
            <dd className="mt-1 flex text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-gray-400">
              <span className="grow">{client.website ?? "-"}</span>
              <span className="ml-4 shrink-0">
                <button
                  type="button"
                  className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 dark:bg-transparent dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Atualizar
                </button>
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">Notas</dt>
            <dd className="mt-1 flex text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-gray-400">
              <span className="grow">{client.notes ?? "-"}</span>
              <span className="ml-4 shrink-0">
                <button
                  type="button"
                  className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 dark:bg-transparent dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Atualizar
                </button>
              </span>
            </dd>
          </div>
          {client.contacts?.length ? (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">Contatos</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-gray-400">
                <ul
                  role="list"
                  className="divide-y divide-gray-100 rounded-md border border-gray-200 dark:divide-white/5 dark:border-white/10"
                >
                  {client.contacts.map((contact) => (
                    <li
                      key={contact.id}
                      className="flex items-center justify-between py-4 pr-5 pl-4 text-sm/6"
                    >
                      <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon
                          aria-hidden="true"
                          className="size-5 shrink-0 text-gray-400 dark:text-gray-500"
                        />
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium text-gray-900 dark:text-white">
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
                      <div className="ml-4 flex shrink-0 space-x-4">
                        <button
                          type="button"
                          className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 dark:bg-transparent dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                          Atualizar
                        </button>
                        <span aria-hidden="true" className="text-gray-200 dark:text-gray-600">
                          |
                        </span>
                        <button
                          type="button"
                          className="rounded-md bg-white font-medium text-gray-900 hover:text-gray-800 dark:bg-transparent dark:text-gray-400 dark:hover:text-white"
                        >
                          Remover
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ) : null}
          {client.addresses?.length ? (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">Endereços</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-gray-400">
                <ul
                  role="list"
                  className="divide-y divide-gray-100 rounded-md border border-gray-200 dark:divide-white/5 dark:border-white/10"
                >
                  {client.addresses.map((address) => (
                    <li
                      key={address.id}
                      className="flex items-center justify-between py-4 pr-5 pl-4 text-sm/6"
                    >
                      <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon
                          aria-hidden="true"
                          className="size-5 shrink-0 text-gray-400 dark:text-gray-500"
                        />
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium text-gray-900 dark:text-white">
                            {address.street}
                          </span>
                          <span className="shrink-0 text-gray-400 dark:text-gray-500">
                            {[address.city, address.state, address.zipCode]
                              .filter(Boolean)
                              .join(", ")}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 flex shrink-0 space-x-4">
                        <button
                          type="button"
                          className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 dark:bg-transparent dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                          Atualizar
                        </button>
                        <span aria-hidden="true" className="text-gray-200 dark:text-gray-600">
                          |
                        </span>
                        <button
                          type="button"
                          className="rounded-md bg-white font-medium text-gray-900 hover:text-gray-800 dark:bg-transparent dark:text-gray-400 dark:hover:text-white"
                        >
                          Remover
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ) : null}
        </dl>
      </div>
    </>
  );
};

export default ClientProfile;


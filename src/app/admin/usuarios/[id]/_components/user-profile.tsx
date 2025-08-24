// External libs
import { Paperclip } from "lucide-react";

// Services
import { type User } from '@/services/users';

interface UserProfileProps {
  user: User;
}

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-gray-900 dark:text-white">Informações do Usuário</h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500 dark:text-gray-400">Detalhes pessoais.</p>
      </div>
      <div className="mt-6 border-t border-gray-100 dark:border-white/10">
        <dl className="divide-y divide-gray-100 dark:divide-white/10">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">Nome completo</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-gray-400">{user.fullName}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">Cargo</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-gray-400">{user.role}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">Email</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-gray-400">{user.email}</dd>
          </div>
          {user.salaryExpectation ? (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">Expectativa salarial</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-gray-400">
                {user.salaryExpectation}
              </dd>
            </div>
          ) : null}
          {user.about ? (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">Sobre</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-gray-400">{user.about}</dd>
            </div>
          ) : null}
          {user.attachments?.length ? (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">Anexos</dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0 dark:text-white">
                <ul
                  role="list"
                  className="divide-y divide-gray-100 rounded-md border border-gray-200 dark:divide-white/5 dark:border-white/10"
                >
                  {user.attachments.map((attachment) => (
                    <li
                      key={attachment.id}
                      className="flex items-center justify-between py-4 pr-5 pl-4 text-sm/6"
                    >
                      <div className="flex w-0 flex-1 items-center">
                        <Paperclip
                          aria-hidden="true"
                          className="size-5 shrink-0 text-gray-400 dark:text-gray-500"
                        />
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium text-gray-900 dark:text-white">
                            {attachment.fileName}
                          </span>
                          <span className="shrink-0 text-gray-400 dark:text-gray-500">
                            {attachment.size}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 shrink-0">
                        <a
                          href={attachment.url}
                          className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                          Download
                        </a>
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

export default UserProfile;

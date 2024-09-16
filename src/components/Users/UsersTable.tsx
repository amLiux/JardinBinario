import React from 'react';
import { UserContext } from '@/types/sharedTypes';
import { Tags } from '@/components/Tags';
import { useMutation } from '@apollo/client';
import { querys } from '@/gql/querys';
import { Table } from '@/components/lib/Table';
import {
  UserMinusIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';

interface UserTableProps {
  users: UserContext[];
  loading: boolean;
  refetch: Function;
}

export const UsersTable = ({ users, loading, refetch }: UserTableProps) => {
  const [toggleUserActive] = useMutation(querys.TOGGLE_USER_ACTIVE);

  const headers: string[] = ['Nombre', 'E-mail', 'Roles', 'Creado'];

  const renderRow = (user: UserContext) => [
    {
      node: (
        <span className="text-sm font-bold">
          {user.name} {user.lastName}
        </span>
      ),
    },
    { node: <span className="text-sm font-bold">{user.email}</span> },
    { node: <Tags tags={['admin', 'writer'] as any} preview={false} /> },
    {
      node: (
        <span className="text-sm font-bold">
          {new Date(user.createdAt).toLocaleDateString('es')}
        </span>
      ),
    },
  ];

  const actions = [
    {
      getIcon: (user: UserContext) =>
        user.active ? (
          <UserMinusIcon className="text-red-600 hover:text-red-800 w-6" />
        ) : (
          <UserPlusIcon className="text-purple-600 hover:text-purple-800 w-6" />
        ),
      getLabel: (user: UserContext) => (user.active ? 'Desactivar' : 'Activar'),
      onClick: async (user: UserContext) => {
        await toggleUserActive({
          variables: { email: user.email },
        });
        refetch();
      },
    },
    // TODO not sure if this is worth it, maybe edit user later on?
    // {
    //   icon: <LockOpenIcon className="w-6 text-blue-600 hover:text-blue-800" />,
    //   label: 'Recuperar Contraseña',
    //   onClick: async (user: UserContext) => {
    //     console.log({ user });
    //     refetch();
    //   },
    //   showCondition: (user: UserContext) => user.active,
    // },
  ];

  return (
    <Table
      data={users}
      headers={headers}
      loading={loading}
      renderRow={renderRow}
      getItemId={(user: UserContext) => user.name}
      isDeleted={(user: UserContext) => !user.active}
      actions={actions}
      title="Usuarios"
    />
  );
};

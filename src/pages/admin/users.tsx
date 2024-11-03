import { withAuth } from '@/hoc/withAuth';
import { useQuery } from '@apollo/client';
import { querys } from '@/gql/querys';
import AdminLayout from '@/layouts/admin';
import { UsersTable } from '@/components/Users/UsersTable';

const AdminBlogPage = () => {
  const { loading, data, refetch } = useQuery(querys.GET_ALL_USERS);

  return (
    <AdminLayout>
      <UsersTable
        refetch={refetch}
        users={data?.getAllUsers}
        loading={loading}
      />
    </AdminLayout>
  );
};

export default withAuth(AdminBlogPage);

import { useRouter } from 'next/router';
import { withAuth } from '@/hoc/withAuth';
import { useQuery } from '@apollo/client';
import { querys } from '@/gql/querys';
import { BlogTable } from '@/components/Blogs/BlogTable';
import AdminLayout from '@/layouts/admin';

const AdminBlogPage = () => {
  const router = useRouter();
  const { loading, data, refetch } = useQuery(querys.GET_ALL_BLOGS);

  return (
    <AdminLayout>
      <BlogTable
        refetch={refetch}
        router={router}
        blogs={data?.getAllEntries}
        loading={loading}
      />
    </AdminLayout>
  );
};

export default withAuth(AdminBlogPage);

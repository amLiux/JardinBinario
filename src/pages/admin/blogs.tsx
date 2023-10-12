import { Layout } from '@/components/Layout';
import { Navbar } from '@/components/Navbar';
import { withAuth } from '@/hoc/withAuth';
import { useQuery } from '@apollo/client';
import { querys } from '@/gql/querys';
import { BlogTable } from '@/components/Blogs/BlogTable';
import { useRouter } from 'next/router';


const AdminBlogPage = () => {
    const router = useRouter();
    const { loading , data, refetch } = useQuery(querys.GET_ALL_BLOGS);

    return (
        <Layout index>
            <Navbar privacy router={router} />
            <BlogTable refetch={refetch} router={router} blogs={data?.getAllEntries} loading={loading} />
        </Layout>
    );
};

export default withAuth(AdminBlogPage);

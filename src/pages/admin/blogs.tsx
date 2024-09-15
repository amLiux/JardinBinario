import { Layout } from '@/components/Layout';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { withAuth } from '@/hoc/withAuth';
import { useQuery } from '@apollo/client';
import { querys } from '@/gql/querys';
import { BlogTable } from '@/components/Blogs/BlogTable';
import { useRouter } from 'next/router';
import { Flexbox } from '@/components/lib/Flexbox';


const AdminBlogPage = () => {
    const router = useRouter();
    const { loading, data, refetch } = useQuery(querys.GET_ALL_BLOGS);

    return (
        <Layout index>
            <Flexbox justifyContent='center' alignItems='center'>
                <Sidebar />
                <BlogTable refetch={refetch} router={router} blogs={data?.getAllEntries} loading={loading} />
            </Flexbox>

        </Layout>
    );
};

export default withAuth(AdminBlogPage);

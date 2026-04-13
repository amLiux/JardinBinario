import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';

import { Layout } from '@/layouts/Layout';
import { Footer } from '@/components/Footer';
import { querys } from '@/gql/querys';
import { createUnauthorizedApolloClient } from '@/apollo/AuthClient';
import { useIndex } from '@/hooks/useIndex';
import { Navbar } from '@/components/Navbar';
import { IndexScreenProps } from '@/types/sharedTypes';
import { Transition } from '@/components/Transition';
import { ReactElement } from 'react';
import { getI18nProps } from 'i18n/loadMessages';

const IndexScreen = dynamic<IndexScreenProps>(
  () => import('@/screens/indexScreen').then((mod) => mod.IndexScreen),
  {
    ssr: false,
    loading: ({ isLoading }) =>
      isLoading ? <div className="min-h-screen"></div> : null,
  }
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = createUnauthorizedApolloClient();
  const { locale } = context;

  const {
    data: { getRecentEntries },
  } = await client.query({
    query: querys.GET_RECENT_BLOGS,
  });

  const {
    data: { getMostViewedEntries },
  } = await client.query({
    query: querys.GET_MOST_VIEWED_BLOGS,
  });

  if (!getRecentEntries || !getMostViewedEntries) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      recentEntries: getRecentEntries,
      mostViewedEntries: getMostViewedEntries,
      ...(await getI18nProps(locale))
    },
  };
};

export default function IndexPage({
  recentEntries,
  mostViewedEntries,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    handleClickServices,
    // TODO think about a router HOC or a way to pass this easily to instanciate it just once on <App/> level maybe?
    router,
    ...restOfIndexProps
  } = useIndex();

  return (
    <Layout index>
      <Navbar router={router} handleClickServices={handleClickServices} />
      <IndexScreen
        recentEntries={recentEntries}
        mostViewedEntries={mostViewedEntries}
        handleClickServices={handleClickServices}
        {...restOfIndexProps}
      />
      <Footer filePath="index" router={router} />
    </Layout>
  );
}

IndexPage.getLayout = function (page: ReactElement) {
  return (
    <Transition>
      {page}
    </Transition>
  );
};

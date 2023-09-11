import { SeoMapping } from '@/seo/index';
import Head from 'next/head';
import React from 'react';

interface DynamicSeoProps {
    seo: SeoMapping;
    asPath: string;
}

export const DynamicSeo = ({seo, asPath}: DynamicSeoProps) => {
  const { description, title } = seo[asPath];
  return (
    <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {/* <meta property="og:image" content={page?.data?.image} /> */}
        <meta property="og:type" content="website" />
        <meta
            property="og:url"
            content={'https://jardinbinario.com' + asPath}
        />
    </Head>
  );
};

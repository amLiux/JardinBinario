import { ReactNode } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { seoMapping } from '@/seo/index';

import layoutStyles from './Layout.module.css';

type LayoutProps = {
	children: ReactNode | ReactNode[];
	style404?: boolean;
	index?: boolean;
};

export const Layout = ({ children, style404 }: LayoutProps) => {
	const router = useRouter();
	const seo = seoMapping[router.asPath];

	return (
		<>
			<Head>
				<title>{seo?.title}</title>
				<meta name="description" content={seo?.description} />
				<meta property="og:title" content={seo?.title} />
				<meta property="og:description" content={seo?.description} />
				{/* <meta property="og:image" content={page?.data?.image} /> */}
				<meta property="og:type" content="website" />
				<meta
					property="og:url"
					content={'https://jardinbinario.com' + router.asPath}
				/>
			</Head>
			<div
				className={`
					${style404 ? layoutStyles.bg404Pattern : 'bg-slate-900'}
					${layoutStyles.smoothRender}
					${layoutStyles.layout}
				`}>
				{children}
			</div>
		</>
	);
};

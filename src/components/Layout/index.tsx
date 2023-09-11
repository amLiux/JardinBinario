import { ReactNode } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SeoMapping, seoMapping } from '@/seo/index';

import layoutStyles from './Layout.module.css';
import { Flexbox } from '../lib/Flexbox';

type LayoutProps = {
	children: ReactNode | ReactNode[];
	style404?: boolean;
	index?: boolean;
};

export const Layout = ({ children, style404 }: LayoutProps) => {
	const { asPath } = useRouter();
	const seo = seoMapping[asPath];

	return (
		<>
			{seo 
				? 
					<Head>
						<title>{seo?.title}</title>
						<meta name="description" content={seo?.description} />
						<meta property="og:title" content={seo?.title} />
						<meta property="og:description" content={seo?.description} />
						{/* <meta property="og:image" content={page?.data?.image} /> */}
						<meta property="og:type" content="website" />
						<meta
							property="og:url"
							content={'https://jardinbinario.com' + asPath}
						/>
					</Head>
				: null
			}
			<Flexbox
				extraClass={`
					min-h-screen
					${style404 ? layoutStyles.bg404Pattern : 'bg-slate-900'}
					${layoutStyles.smoothRender}
				`}
				justifyContent='center'
				flexDirection='column'
			>
				{children}
			</Flexbox>
		</>
	);
};

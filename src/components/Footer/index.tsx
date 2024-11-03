import Image, { StaticImageData } from 'next/legacy/image';
import { NextRouter } from 'next/router';
import gitHubLogo from '@/assets/logos/gitHubLogo.svg';
import youtubeLogo from '@/assets/logos/youtubeLogo.svg';
import linkedinLogo from '@/assets/logos/linkedinLogo.svg';
import edit from '@/assets/edit.png';

import footerStyles from './Footer.module.css';
import { Flexbox } from '../lib/Flexbox';
import { Logo } from '../Logo';

interface FooterProps {
	router: NextRouter;
	filePath: string;
};

type SocialMediaEntry = {
	url: string;
	logo: StaticImageData;
	alt: string;
	displayName: string;
};

const socialMedia: SocialMediaEntry[] = [
	{
		url: 'https://github.com/JardinBinario',
		logo: gitHubLogo,
		alt: 'github logo',
		displayName: 'GitHub',
	},
	{
		url: 'https://youtube.com/jardinbinario',
		logo: youtubeLogo,
		alt: 'youtube logo',
		displayName: 'YouTube',
	},
	{
		url: 'https://www.linkedin.com/company/jard%C3%ADn-binario/',
		logo: linkedinLogo,
		alt: 'linkedin logo',
		displayName: 'LinkedIn',
	},
];

export const Footer = ({ router, filePath }: FooterProps) => {
	return (
		<Flexbox alignItems='center' justifyContent='space-around' extraClass={footerStyles.container}>
			{
				filePath ?
					<p onClick={() => router.push(`https://github.com/Marceliux/JardinBinario/blob/main/src/pages/${filePath}.tsx`)} className={footerStyles.edit}>
						Edit this page
						<Image src={edit} alt='pencil drawing' height={20} width={20} />
					</p>
					:
					<div></div>
			}
			<Logo router={router} isSmall />
			<ul className={footerStyles.socialMedia}>
				{
					socialMedia.map(({ alt, displayName, url, logo }, idx) =>
						<li key={idx}>
							<a href={url} className='min-w-[50px] text-center' target='blank'>
								{displayName}
							</a>
							<div className={footerStyles.socialMediaLogoContainer}>
								<Image src={logo} alt={alt} layout='responsive' />
							</div>
						</li>
					)
				}
			</ul>
		</Flexbox>
	);
};

import Image, { StaticImageData } from 'next/image';
import { NextRouter } from 'next/router';
import logo from '@/assets/littleLogo.png';
import gitHubLogo from '@/assets/logos/gitHubLogo.png';
import youtubeLogo from '@/assets/logos/youtubeLogo.png';
import linkedinLogo from '@/assets/logos/linkedinLogo.png';
import behanceLogo from '@/assets/logos/behanceLogo.png';
import edit from '@/assets/edit.png';

import footerStyles from './Footer.module.css';

interface FooterProps {
	router: NextRouter;
};

type SocialMediaEntry = {
	url: string;
	logo: StaticImageData;
	alt: string;
	displayName: string;
};

const socialMedia: SocialMediaEntry[] = [
	{
		url: 'https://github.com/marceliux',
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
		url: 'https://behance.com/jardinbinario',
		logo: behanceLogo,
		alt: 'behance logo',
		displayName: 'Behance',
	},
	{
		url: 'https://www.linkedin.com/company/jard%C3%ADn-binario/',
		logo: linkedinLogo,
		alt: 'linkedin logo',
		displayName: 'LinkedIn',
	},
];

export const Footer = ({ router }: FooterProps) => {
	return (
		<div className={footerStyles.container}>
			<p onClick={() => router.push('https://github.com/Marceliux/JardinBinario/blob/main/src/pages/index.tsx')} className={footerStyles.edit}>
				Edit this page
				<Image src={edit} alt='pencil drawing' height={24} width={24} />
			</p>
			<div
				onClick={() => router.push('/')}
				className={footerStyles.imageContainer}>
				<Image src={logo} alt='jardin binario logo little version' layout='responsive' />
			</div>
			<ul className={footerStyles.socialMedia}>
				{
					socialMedia.map(({ alt, displayName, url, logo }, idx) =>
						<li key={idx}>
							<a href={url} target='blank'>
								{displayName}
							</a>
							<div className={footerStyles.socialMediaLogoContainer}>
								<Image src={logo} alt={alt} layout='responsive' />
							</div>
						</li>
					)
				}
			</ul>
		</div>
	);
};

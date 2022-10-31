import Image from 'next/image';

import imagen1 from '@/assets/imagen1.jpg';
import imagen2 from '@/assets/imagen2.jpg';
import imagen3 from '@/assets/imagen3.jpg';

import photoCompositionStyles from './PhotoComposition.module.css';

const toRender = [
	{
		image: imagen3,
		alt: 'a desk with some work on branding design with an iPad',
	},
	{ 
		image: imagen2,
		alt: 'mobile application interface sketches',
	},
	{
		image: imagen1,
		alt: 'someone coding on a laptop with a cup on coffee and a plant on the desk',
	}
];

export const PhotoComposition = () => {
	const getComputedStyle = (number: number) => {
		const propToCheck = `compositionPhoto--p${number}`;
		return photoCompositionStyles?.[propToCheck] ? photoCompositionStyles[propToCheck] : '';
	};

	return (
		<>
			<div className={photoCompositionStyles.container}>
				<div className={photoCompositionStyles.composition}>
					{toRender.map(({image, alt}, idx) =>
						<Image
							key={idx}
							className={`${photoCompositionStyles.compositionPhoto} ${getComputedStyle(idx + 1)}`}
							alt={alt}
							src={image}
							width={400}
							height={400}
							objectFit='cover'
						/>
					)
					}
				</div>
			</div>
		</>
	);
};

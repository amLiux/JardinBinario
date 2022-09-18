import Image from 'next/image'
import React from 'react'

import imagen1 from '../../public/imagen1.jpg';
import imagen2 from '../../public/imagen2.jpg';
import imagen3 from '../../public/imagen3.jpg';

import photoCompositionStyles from './PhotoComposition.module.css';

const toRender = [
	{
		image: imagen3,
		alt: ''
	},
	{ 
		image: imagen2,
		alt: '',
	},
	{
		image: imagen1,
		alt: ''
	}
];

export const PhotoComposition = () => {
	const getComputedStyle = (number: number) => {
		const propToCheck = `compositionPhoto--p${number}`
		return photoCompositionStyles?.[propToCheck] ? photoCompositionStyles[propToCheck] : '';
	}

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
	)
}

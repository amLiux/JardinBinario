import React from 'react';
import Image from 'next/legacy/image';
import { Layout } from '@/layouts/Layout';
import logo from '@/assets/logo.png';
import { Flexbox } from '../lib/Flexbox';

export const LoadingSplash = () => {
	return (
		<Layout index>
			<Flexbox alignItems='center' justifyContent='center'>
				<div className='animate-pulse w-80'>
					<Image src={logo} alt='Jardin Binario logo' layout='responsive' />
				</div>
			</Flexbox>
		</Layout>
	);
};

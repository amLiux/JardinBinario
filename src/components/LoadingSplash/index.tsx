import React from 'react';
import { Layout } from '../Layout';
import Image from 'next/image';
import logo from '../../public/logo.png';

export const LoadingSplash = () => {
	return (
		<Layout index>
			<div className='flex items-center justify-center'>
				<div className='animate-pulse w-80'>
					<Image src={logo} alt='Jardin Binario logo' layout='responsive' />
				</div>
			</div>
		</Layout>
	);
};

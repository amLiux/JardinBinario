import React from 'react';
import Image from 'next/image';
import { Layout } from '@/components/Layout';
import logo from '@/assets/logo.png';

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

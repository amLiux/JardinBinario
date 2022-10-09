import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Sky } from '../components/404/Sky';
import { Layout } from '../components/Layout';

export default function Custom404() {
	const router = useRouter();

	useEffect(() => {
		setTimeout(() => router.push('/'), 6500);
	}, [router]);

	return (
		<>
			<Layout style404={true}>
				<Sky stars={5} />
				<div className='errorContainer'>
					<h1 className='header'>
						<code>404 NOT FOUND.</code>
					</h1>
				</div>
			</Layout>
		</>
	);
}

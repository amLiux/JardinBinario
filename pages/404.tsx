import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Sky } from '../components/404/Sky';
import { Layout } from '../components/Layout';

export default function Custom404() {
	// TODO redirect to index after 2 seconds when its created
	const router = useRouter();
	useEffect(() => {
		setTimeout(() => router.push('/login'), 6500);
	}, [router]);

	return (
		<>
			<Layout style404={true}>
				<Sky stars={5} />
				<div className="errorContainer">
					<h1>
						<code>404 NOT FOUND.</code>
					</h1>
				</div>
			</Layout>
		</>
	)
}

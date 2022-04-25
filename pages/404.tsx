import React from 'react'
import { Sky } from '../components/404/Sky'
import { Layout } from '../components/Layout'

export default function Custom404() {
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

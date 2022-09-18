import { Layout } from '../components/Layout';
import { TerminalHeader } from '../components/Terminal/TerminalHeader';
import { Index } from '../components/Index';
import { useRef } from 'react';

export default function IndexPage() {
	const refSerices = useRef<HTMLDivElement>(null);

    const handleClickServices = () => {
		refSerices.current?.scrollIntoView({behavior: 'smooth'});
    };

	return (
		<>
			<Layout>
				<TerminalHeader handleClickServices={handleClickServices} index header='Jardín Binario' />
				<Index refForScroll={refSerices} />
			</Layout>
		</>
	)
}

"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Sky } from '@/components/404/Sky';
import { Layout } from '@/layouts/Layout';
import { CanvasBackground } from '@/components/Canva';
import '../styles/globals.css';

export default function Custom404() {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => router.push('/'), 6500);
    }, [router]);

    return (
        <>
            <div className="fixed inset-0 pointer-events-none">
                <CanvasBackground />
            </div>
            <Sky stars={5} />
            <Layout style404={true}>
                <div className="errorContainer">
                    <h1 className="header">
                        <code>404 NOT FOUND.</code>
                    </h1>
                </div>
            </Layout>
        </>
    );
}

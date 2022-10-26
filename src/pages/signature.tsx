import React, { ChangeEvent, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { Layout } from '../components/Layout';
import { TerminalHeader } from '../components/Terminal/TerminalHeader';
import { Footer } from '../components/Footer';
import { Input } from '../components/TicketForm/Input';
import { Signature } from '../components/Signature';
import { SignatureInfo } from '../types/sharedTypes';
import { Checkbox } from '../components/Checkbox';

type SignaturePropMapping = {
    placeholder: string;
    type: 'text' | 'email' | 'phone';
};

export default function SignaturePage() {
    const router = useRouter();
    const signatureRef = useRef<HTMLDivElement>(null);
    const [confidentialEmails, setConfidentialEmails] = useState<boolean>(false);
    const [darkSignature, setDarkSignature] = useState<boolean>(false);
    const [signatureInfo, setSignatureInfo] = useState<SignatureInfo>({
        name: 'John Doe',
        position: 'Jedi Master',
        // TODO should we do a drop down with pre-defined departments?
        department: 'Ingeniería',
        phoneNumber: '8888-8888',
        email: 'test@jardinbinario.com',
    });

    const signaturePropMapping: Record<string, SignaturePropMapping> = {
        name: {
            placeholder: 'Nombre completo',
            type: 'text',
        },
        position: {
            placeholder: 'Posición',
            type: 'text',
        },
        department: {
            placeholder: 'Departamento',
            type: 'text',
        },
        phoneNumber: {
            placeholder: 'Numero telefónico',
            type: 'phone',
        },
        email: {
            placeholder: 'Correo electrónico',
            type: 'email',
        },
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, id } = e.target;
        setSignatureInfo({
            ...signatureInfo,
            [id]: value,
        });
    };

    return (
        <Layout index>
            <TerminalHeader router={router} index header='Jardín Binario' />
            <div style={{ display: 'flex', height: '56vh', marginTop: '4rem', justifyContent: 'space-evenly', alignItems: 'center', width: '100vw' }}>
                <div>
                    <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '10px', paddingRight: '1.5rem' }}>
                        {Object.keys(signatureInfo).map((prop, idx) => {
                            const propAsKey = prop as keyof SignatureInfo;
                            const { placeholder, type } = signaturePropMapping[prop];

                            return (
                                <Input
                                    key={idx}
                                    id={prop}
                                    placeholder={placeholder}
                                    value={signatureInfo[propAsKey]}
                                    type={type}
                                    handleChange={handleChange}
                                />
                            );
                        }
                        )}
                        <Checkbox
                            id='confidential'
                            message='Haces correos'
                            tooltipToHover='confidenciales?'
                            tooltip='Firmas contratos con clientes? Parte del equipo de ventas o legal? Si no estas seguro contacta con el equipo de RH o tu manager!'
                            handleCheck={() => setConfidentialEmails(!confidentialEmails)}
                            signature
                        />
                        <Checkbox
                            id='dark'
                            message='Versión oscura'
                            handleCheck={() => setDarkSignature(!darkSignature)}
                            signature
                        />
                    </div>
                </div>
                <Signature dark={darkSignature} confidential={confidentialEmails} signatureRef={signatureRef} signatureInfo={signatureInfo} />

            </div>

            <Footer router={router} />
        </Layout>
    );
}
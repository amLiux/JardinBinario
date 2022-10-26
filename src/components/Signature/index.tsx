/* eslint-disable @next/next/no-img-element */
import React, { RefObject, useMemo, useState } from 'react';
import { SignatureInfo } from '../../types/sharedTypes';

interface SignatureProps {
    signatureInfo: SignatureInfo;
    signatureRef: RefObject<HTMLDivElement>;
    confidential: boolean;
    dark: boolean;
}

// Note: cannot abstract styling to tailwind because at copy time it will grab classNames instead of style tag so we lose all styling

export const Signature = ({ signatureInfo, signatureRef, confidential, dark }: SignatureProps) => {
    const [copied, setCopied] = useState<boolean>(false);
    const signatureInfoMapping = useMemo(() => ({
        phone: {
            logo: 'https://res.cloudinary.com/drrcrnuln/image/upload/v1666760196/jardin-binario-assets/phone-email_nil1yd.png',
            logoDark: 'https://res.cloudinary.com/drrcrnuln/image/upload/v1666799995/jardin-binario-assets/phone-email-dark_zlluwe.png',
            value: `(506) ${signatureInfo.phoneNumber}`,
            href: `tel:(506) ${signatureInfo.phoneNumber}`
        },
        email: {
            logo: 'https://res.cloudinary.com/drrcrnuln/image/upload/v1666760084/jardin-binario-assets/mail-email_t9hgew.png',
            logoDark: 'https://res.cloudinary.com/drrcrnuln/image/upload/v1666799964/jardin-binario-assets/mail-email-dark_mkzagn.png',
            value: signatureInfo.email,
            href: `mailto:${signatureInfo.email}`
        },
        website: {
            logo: 'https://res.cloudinary.com/drrcrnuln/image/upload/v1666760319/jardin-binario-assets/website-email_hx9y9w.png',
            logoDark: 'https://res.cloudinary.com/drrcrnuln/image/upload/v1666799981/jardin-binario-assets/website-email-dark_nm7jnr.png',
            value: 'https://www.jardinbinario.com',
            href: 'https://www.jardinbinario.com',
        },
        location: {
            logo: 'https://res.cloudinary.com/drrcrnuln/image/upload/v1666760015/jardin-binario-assets/location-email_aupoup.png',
            logoDark: 'https://res.cloudinary.com/drrcrnuln/image/upload/v1666799944/jardin-binario-assets/location-email-dark_nkt8qc.png',
            value: 'Alajuela, Costa Rica'
        }
    }), [signatureInfo]);

    function copyToClip(str: string) {
        setCopied(!copied);
        function listener(e: any) {
            e.clipboardData.setData('text/html', str);
            e.clipboardData.setData('text/plain', str);
            e.preventDefault();
        }
        document.addEventListener('copy', listener);
        document.execCommand('copy');
        document.removeEventListener('copy', listener);

        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className='flex flex-col h-full justify-around transition-all ease-in-out'>
            <div ref={signatureRef}>
                <table style={{ transition:'all ease-in-out', fontFamily:'system-ui', backgroundColor: `${dark ? 'black' : 'white'}`, borderRadius: '10px', padding: '1rem' }} cellSpacing="0" cellPadding="20">
                    <tbody>
                        <tr>
                            <td>
                                <table cellSpacing="0" cellPadding="0">
                                    <tbody>
                                        <tr>
                                            <td style={{ verticalAlign: 'top' }}>
                                                <h3
                                                    style={{ margin: '0px', fontWeight: '700', fontSize: '20px', color: `${dark ? 'white' : 'black'}` }}
                                                >
                                                    {
                                                        signatureInfo.name.split(' ').map((word, idx, total) => {
                                                            return <React.Fragment key={idx}>
                                                                <span>{word}</span>
                                                                {
                                                                    idx < total.length && <span>&nbsp;</span>
                                                                }
                                                            </React.Fragment>;
                                                        })
                                                    }
                                                </h3>
                                                <p style={{ fontWeight: '500', fontStyle:'italic',  margin: '0px', color: `${dark ? 'white' : 'black'}`, lineHeight: '24px' }}>
                                                    <span>{signatureInfo.position}</span>
                                                </p>
                                                <p style={{ margin: '0px', fontWeight: '500', color: `${dark ? 'white' : 'black'}`, lineHeight: '24px' }}>
                                                    <span>{signatureInfo.department}</span><span>&nbsp;|&nbsp;</span>
                                                    <span>Jardín Binario</span>
                                                </p>
                                                <table style={{ width: '100%' }} cellSpacing="0" cellPadding="0">
                                                    <tbody>
                                                        <tr>
                                                            <td height="30"></td>
                                                        </tr>
                                                        <tr>
                                                            <td color="#c46a3d" style={{ width: '100%', borderBottom: '2px solid rgb(196, 106, 61)', borderLeft: 'medium none', display: 'block' }} height="1">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="15"></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table cellSpacing="0" cellPadding="0">
                                                    <tbody>
                                                        {
                                                            Object.values(signatureInfoMapping).map((info: any, idx: number) => (
                                                                <tr key={idx} style={{ height: '30' }}>
                                                                    <td width="30">
                                                                        <table cellSpacing="0" cellPadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td style={{ display: 'flex' }}>
                                                                                        <span style={{ display: 'block', width: '11' }}>
                                                                                            <img alt='alt' src={dark ? info.logo : info.logoDark} style={{ display: 'block' }} width="13" />
                                                                                        </span>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            info.href
                                                                                ? <a href={info.href} style={{ textDecoration: 'none', color: `${dark ? 'white' : 'black'}`, fontSize: '12px' }}>
                                                                                    <span>{info.value}</span>
                                                                                </a>
                                                                                : <span style={{ fontSize: '12px', color: `${dark ? 'white' : 'black'}` }}>{info.value}</span>
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                                {
                                                    confidential &&
                                                    <>
                                                        <table style={{ width: '100%' }} cellSpacing="0" cellPadding="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td height="17"></td>
                                                                </tr>
                                                                <tr>
                                                                    <td color="#c46a3d" style={{ width: '100%', borderBottom: '2px solid rgb(196, 106, 61)', borderLeft: 'medium none', display: 'block' }} height="1">
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td height="15"></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table style={{ maxWidth: '330px' }} cellSpacing="0" cellPadding="0">
                                                            <tbody>
                                                                <tr style={{ height: '25' }}>
                                                                    <td>
                                                                        <p style={{ fontSize: '12px', wordBreak: 'break-all', color: 'white' }}>El contenido de este correo electrónico es confidencial y está destinado únicamente al destinatario especificado en el mensaje. Está estrictamente prohibido compartir cualquier parte de este mensaje con terceros, sin el consentimiento por escrito del remitente.</p>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </>
                                                }
                                            </td>
                                            <td width="80">
                                                <div></div>
                                            </td>
                                            <td style={{ verticalAlign: 'top' }}>
                                                <table cellSpacing="0" cellPadding="0">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <img alt='jardin binario logo' src="https://res.cloudinary.com/drrcrnuln/image/upload/v1666709770/jardin-binario-assets/littleLogo_lwhjmy.png" role="presentation" style={{ maxWidth: '140px', display: 'block' }} width="140" />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button style={{ width: '14em' }} onClick={() => {
                const code = signatureRef?.current && signatureRef.current.innerHTML;
                copyToClip(String(code));
            }} disabled={copied} className="relative border-2 border-purple-500 inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-purple-600 transition-all duration-150 ease-in-out text-center rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
                <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-purple-500 group-hover:h-full"></span>
                <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">{copied ? 'Copied!' : 'Get your signature'}</span>
            </button>
        </div>
    );
};

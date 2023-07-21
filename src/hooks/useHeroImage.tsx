import { Image } from '@/types/sharedTypes';
import { useEffect, useState } from 'react';

type ImageType = Image['img'];

export const useHeroImage = (img:ImageType) => {
    const [imageUrl, setImageUrl] = useState<string>('');
    const SIZE = 600;
    function b64toBlob(base64: ImageType['buffer'], contentType: ImageType['contentType']): Blob {
        const byteCharacters = atob(base64);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        return new Blob(byteArrays, { type: contentType });
    }

    useEffect(() => {
        const blob = b64toBlob(img.buffer, img.contentType);
        if (blob) {
            setImageUrl(URL.createObjectURL(blob));
        }

    }, [img]);

    return {
        imageUrl,
        SIZE,
    };

};
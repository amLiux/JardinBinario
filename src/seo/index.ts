// import { BlogEntry } from '../types/sharedTypes';

export interface SeoMapping {
    [key: string] : {
        title:string;
        description:string;
        author?: string;
        createdAt?: string;
    }
};

export const seoMapping:SeoMapping = {
    '/': {
        title: 'Jardín Binario | Artesanía convertida en tecnología',
        description: 'Somos una compañía de software que provee servicios de asesoría y/o subcontratación para trabajar en tus ideas y ayudarlas a crecer.',
    },
    '/signature': {
        title: 'Jardín Binario | Generador de firmas',
        description: 'Generador de firmas de correo para Jardín Binario',
    }
};

// export const dynamicSeoGenerator = (blog:BlogEntry):SeoMapping => {

// };
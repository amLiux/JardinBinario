export interface SeoMapping {
    [key: string] : {
        title:string;
        description:string;
    }
};

export const seoMapping:SeoMapping = {
    '/': {
        title: 'Jardín Binario | Artesanía convertida en tecnología',
        description: 'Somos una compañía de software que provee servicios de asesoría y/o subcontratación para trabajar en tus ideas y ayudarlas a crecer.',
    }
};
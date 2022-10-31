import { StaticImageData } from 'next/image';
import reactLogo from '@/assets/logos/reactLogo.png';
import nodeLogo from '@/assets/logos/nodeLogo.png';
import graphqlLogo from '@/assets/logos/graphqlLogo.png';
import pythonLogo from '@/assets/logos/pythonLogo.png';
import flutterLogo from '@/assets/logos/flutterLogo.png';
import figmaLogo from '@/assets/logos/figmaLogo.png';
import adobeCloudLogo from '@/assets/logos/adobeCloudLogo.png';
import typescriptLogo from '@/assets/logos/typescriptLogo.png';
import iosLogo from '@/assets/logos/iosLogo.png';
import androidLogo from '@/assets/logos/androidLogo.png';
import obsLogo from '@/assets/logos/obsLogo.png';

type Stack = {
    name: string;
    logo: StaticImageData;
    alt: string;
}


type Services = {
    title: string;
    description: string;
    stack?: Stack[];
}

export const services:Services[] = [
    {
        title: 'Desarrollo Full-stack',
        description: 'Nuestros desarrolladores trabajan en constante comunicación con nuestro equipo de diseñadores para brindar y entregar aplicaciones e interfaces detalladas e intuitivas. Combinadas con metodología planificada rigurosamente para poder trabajar el lado logístico de su aplicación.',
        stack: [
            {name: 'react', logo: reactLogo, alt: 'React logo'}, 
            {name: 'node', logo: nodeLogo, alt: 'Nodejs logo'},
            {name: 'grapgql', logo: graphqlLogo, alt: 'GraphQL logo'},
            {name: 'python', logo: pythonLogo, alt: 'Python logo'},
        ],
    },
    {
        title: 'Desarrollo Mobile',
        description: 'El equipo de Jardín Binario está capacitado y equipado para implementar soluciones multi-plataforma, ya sea con tecnologías que permiten el desarrollo con una sola base de código para ambas plataformas y/o un desarrollo nativo 100% ajustable a sus necesidades.',
        stack: [
            {name: 'react native', logo: reactLogo, alt: 'React Native logo'},
            {name: 'flutter', logo: flutterLogo, alt: 'Flutter logo'},
            {name: 'ios', logo: iosLogo, alt: 'iOS Logo'},
            {name: 'android', logo: androidLogo, alt: 'Android logo'},
        ]
    },
    {
        title: 'Diseño',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil. as;lkfjalksfjl akjflaksjl ajslfjalskfjalskjf lasjflkasjflaksjfalksf lkajsflkajslfkjaslfkj asf asgasgasga asgasgasga agsgasgasg',
        stack: [
            {name: 'adobe', logo: adobeCloudLogo, alt: 'Adobe Cloud logo'},
            {name: 'figma', logo: figmaLogo, alt: 'Figma logo'},
        ]
    },
    {
        title: 'Educación',
        description: '¿Quieres un entrenamiento de alguna tecnología que tu equipo planea implementar? ¿Quieres adentrarte en una tecnología nueva y necesitas evacuar dudas? Nuestro equipo está disponible para ayudarte con tu proceso educativo con entrenamientos generales o especializados.',
        stack: [
            {name: 'adobe', logo: adobeCloudLogo, alt: 'Adobe Cloud logo'},
            {name: 'figma', logo: figmaLogo, alt: 'Figma logo'},
            {name: 'typescript', logo: typescriptLogo, alt: 'Typescript logo'},
            {name: 'obs', logo: obsLogo, alt: 'OBS logo'},
        ]
    },
];
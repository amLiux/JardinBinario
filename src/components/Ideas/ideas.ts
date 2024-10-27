import { StaticImageData } from 'next/legacy/image';
import pythonLogo from '@/assets/logos/pythonLogo.svg';
import reactLogo from '@/assets/logos/reactLogo.svg';
import nodeLogo from '@/assets/logos/nodeLogo.svg';
import gqlLogo from '@/assets/logos/graphqlLogo.svg';
import slackLogo from '@/assets/logos/slackLogo.svg';
import trelloLogo from '@/assets/logos/trelloLogo.svg';

type Stack = {
  name: string;
  logo: StaticImageData;
  alt: string;
};

type Ideas = {
  title: string;
  description: string;
  stack?: Stack[];
  repoUrl: string;
};

// TODO this will probably move to an API when we create the Admin dashboard, but for now hardcoded it's okay
export const ideas: Ideas[] = [
  {
    title: 'Brainy Board',
    description:
      "Brainy Board es una plugin de colaboración y gestión de tareas en línea que por medio de API's, con código abierto y fácil de usar, que aumenta la productividad del equipo. Ideal para implementar en software factories/oficinas de software. Además, cualquier persona puede contribuir al desarrollo del proyecto.",
    stack: [
      { name: 'python', logo: pythonLogo, alt: 'Python logo' },
      { name: 'slack', logo: slackLogo, alt: 'Slack logo' },
      { name: 'trello', logo: trelloLogo, alt: 'Trello logo' },
    ],
    repoUrl: 'https://github.com/amLiux/BrainyBoard',
  },
  {
    title: 'Jardín Binario',
    description:
      'Jardín Binario es una plataforma social para conectar inversores, emprendedores y especialistas, fomentando la creación de empresas innovadoras y la generación de empleos. Además, también ofrecemos una plataforma de blogs para compartir conocimientos, experiencias y conocer futuros socios.',
    stack: [
      { name: 'react', logo: reactLogo, alt: 'React logo' },
      { name: 'node', logo: nodeLogo, alt: 'Nodejs logo' },
      { name: 'graphql', logo: gqlLogo, alt: 'GraphQL logo' },
    ],
    repoUrl: 'https://github.com/amLiux/JardinBinario',
  },
];

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

export const useIdeas = (t: (key: string) => string) => {

  const ideas: Ideas[] = [
    {
      title: 'Brainy Board',
      description: t('ideas.brainyBoardDesc'),
      stack: [
        { name: 'python', logo: pythonLogo, alt: 'Python logo' },
        { name: 'slack', logo: slackLogo, alt: 'Slack logo' },
        { name: 'trello', logo: trelloLogo, alt: 'Trello logo' },
      ],
      repoUrl: 'https://github.com/amLiux/BrainyBoard',
    },
    {
      title: 'Jardín Binario',
      description:  t('ideas.jardinBinarioDesc'),
      stack: [
        { name: 'react', logo: reactLogo, alt: 'React logo' },
        { name: 'node', logo: nodeLogo, alt: 'Nodejs logo' },
        { name: 'graphql', logo: gqlLogo, alt: 'GraphQL logo' },
      ],
      repoUrl: 'https://github.com/amLiux/JardinBinario',
    },
  ];

  return {
    ideas
  };
}



import indexStyles from '@/components/Index/Index.module.css';
import { Layout } from '@/layouts/Layout';
import { TerminalHeader } from '@/components/Terminal/TerminalHeader';
import { Footer } from '@/components/Footer';
import { useIndex } from '@/hooks/useIndex';
import { HeadingBlock } from '@/components/Index/HeadingBlock';
import { texts } from '@/components/Index/text';
import { Navbar } from '@/components/Navbar';
import { Transition } from '@/components/Transition';
import { ReactElement } from 'react-markdown/lib/react-markdown';

export default function PrivacyPage() {
  const {
    handleClickServices,
    // TODO think about a router HOC or a way to pass this easily to instanciate it just once on <App/> level maybe?
    router,
    ...restOfIndexProps
  } = useIndex();

  return (
    <Layout index>
      <Navbar
        privacy
        router={router}
        handleClickServices={handleClickServices}
      />
      <div className={indexStyles.index}>
        <HeadingBlock
          subheadingAnimationDirection="Right"
          headingAnimationDirection="Left"
          tag="h1"
          block={texts.privacyIntroBlock}
        />
        <HeadingBlock
          subheadingAnimationDirection="Right"
          headingAnimationDirection="Left"
          tag="h3"
          block={texts.privacyInfoBlock}
        />
        <HeadingBlock
          subheadingAnimationDirection="Right"
          headingAnimationDirection="Left"
          tag="h3"
          block={texts.privacyRecopilationBlock}
        />
        <HeadingBlock
          subheadingAnimationDirection="Right"
          headingAnimationDirection="Left"
          tag="h3"
          block={texts.privacyInfoUseBlock}
        />
        <HeadingBlock
          subheadingAnimationDirection="Right"
          headingAnimationDirection="Left"
          tag="h3"
          block={texts.privacySharingBlock}
        />
        <HeadingBlock
          subheadingAnimationDirection="Right"
          headingAnimationDirection="Left"
          tag="h3"
          block={texts.privacyRightsBlock}
        />
        <HeadingBlock
          subheadingAnimationDirection="Right"
          headingAnimationDirection="Left"
          tag="h3"
          block={texts.privacyRetentionBlock}
        />
        <HeadingBlock
          subheadingAnimationDirection="Right"
          headingAnimationDirection="Left"
          tag="h3"
          block={texts.privacyChangesBlock}
        />
        <HeadingBlock
          subheadingAnimationDirection="Right"
          headingAnimationDirection="Left"
          tag="h3"
          block={texts.privacyContactBlock}
        />
      </div>
      <Footer filePath="privacy" router={router} />
    </Layout>
  );
}

PrivacyPage.getLayout = function (page: ReactElement) {
  return <Transition fancyTransition>{page}</Transition>;
};

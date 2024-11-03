import { useTexts } from '@/components/Index/text';
import indexStyles from '@/components/Index/Index.module.css';
import { PhotoComposition } from '@/components/PhotoComposition';
import { Ideas } from '@/components/Ideas';
import { TicketForm } from '@/components/TicketForm';
import { Newsletter } from '@/components/Newsletter';
import { HeadingBlock } from '@/components/Index/HeadingBlock';
import { Blogs } from '@/components/Blogs';
import { Hero } from '@/components/Hero/Hero';
import { IndexScreenProps } from '@/types/sharedTypes';

export const IndexScreen = (props: IndexScreenProps) => {
  const {
    recentEntries,
    mostViewedEntries,
    refForm,
    refServices,
  } = props;

  const { texts, t } = useTexts('index');

  return (
    <>
      <Hero />
      <div className={indexStyles.index}>
        <HeadingBlock
          subheadingAnimationDirection="Right"
          headingAnimationDirection="Left"
          tag="h1"
          block={texts.introBlock}
        />
        <PhotoComposition t={t} />
        <HeadingBlock
          headingAnimationDirection="Right"
          subheadingAnimationDirection="Left"
          tag="h2"
          block={texts.descriptionBlock}
        />
        <Newsletter t={t} />
        <Ideas t={t} refForScroll={refServices} />
        <HeadingBlock
          headingAnimationDirection="Right"
          subheadingAnimationDirection="Left"
          tag="h3"
          block={texts.disclaimerBlock}
        />
        <TicketForm t={t} refForForm={refForm} />
        <Blogs
          t={t}
          recentBlogs={recentEntries}
          mostViewedBlogs={mostViewedEntries}
        />
      </div>
    </>
  );
};

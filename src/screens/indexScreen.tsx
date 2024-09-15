import { texts } from '@/components/Index/text';
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
    imagesLoading,
    imagesError,
    images,
  } = props;

  return (
    <>
      <Hero
        imagesLoading={imagesLoading}
        imagesError={imagesError}
        data={images}
      />
      <div className={indexStyles.index}>
        <HeadingBlock
          subheadingAnimationDirection="Right"
          headingAnimationDirection="Left"
          tag="h1"
          block={texts.introBlock}
        />
        <PhotoComposition />
        <Newsletter />
        <HeadingBlock
          headingAnimationDirection="Right"
          subheadingAnimationDirection="Left"
          tag="h2"
          block={texts.descriptionBlock}
        />
        <Ideas refForScroll={refServices} />
        <HeadingBlock
          headingAnimationDirection="Right"
          subheadingAnimationDirection="Left"
          tag="h3"
          block={texts.disclaimerBlock}
        />
        <TicketForm refForForm={refForm} />
        <Blogs
          recentBlogs={recentEntries}
          mostViewedBlogs={mostViewedEntries}
        />
      </div>
    </>
  );
};

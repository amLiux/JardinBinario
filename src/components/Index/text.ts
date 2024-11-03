import useTranslation from "next-translate/useTranslation";

export const useTexts = (context: string) => {

  const { t } = useTranslation(context);


  const texts = {
    introBlock: {
      heading: {
        firstPart: t('introBlock.heading.firstPart'),
        highlight: t('introBlock.heading.highlight'),
        secondPart: t('introBlock.heading.secondPart'),
      },
      subheading: t('introBlock.subheading'),
      link: [
        {
          toWrap: 'open-source',
          link: 'https://www.redhat.com/es/topics/open-source/what-is-open-source',
        },
      ],
    },
    descriptionBlock: {
      heading: {
        firstPart: t('descriptionBlock.heading.firstPart'),
        highlight: t('descriptionBlock.heading.highlight'),
        secondPart: t('descriptionBlock.heading.secondPart'),
      },
      subheading: t('descriptionBlock.subheading'),
    },
    disclaimerBlock: {
      subheading: t('disclaimerBlock.subheading'),
    },
    privacyIntroBlock: {
      heading: {
        firstPart: t('privacyIntroBlock.heading.firstPart'),
        highlight: t('privacyIntroBlock.heading.highlight'),
      },
      subheading: t('privacyIntroBlock.subheading'),
      link: [
        {
          toWrap: 'Jardín Binario',
          link: 'https://www.jardinbinario.com/',
        },
      ],
    },
    privacyInfoBlock: {
      heading: {
        highlight: t('privacyInfoBlock.heading.highlight'),
        secondPart: t('privacyInfoBlock.heading.secondPart'),
      },
      subheading: t('privacyInfoBlock.subheading'),
    },
    privacyRecopilationBlock: {
      heading: {
        highlight: t('privacyRecopilationBlock.heading.highlight'),
        firstPart: t('privacyRecopilationBlock.heading.firstPart'),
      },
      subheading: t('privacyRecopilationBlock.subheading'),
      link: [
        {
          toWrap: 'js-cookie',
          link: 'https://www.npmjs.com/package/js-cookie',
        },
        {
          toWrap: 'window.navigator',
          link: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/navigator',
        },
      ],
    },
    privacyInfoUseBlock: {
      heading: {
        firstPart: t('privacyInfoUseBlock.heading.firstPart'),
        highlight: t('privacyInfoUseBlock.heading.highlight'),
        secondPart: t('privacyInfoUseBlock.heading.secondPart'),
      },
      subheading: t('privacyInfoUseBlock.subheading'),
    },
    privacyRightsBlock: {
      heading: {
        firstPart: t('privacyRightsBlock.heading.firstPart'),
        highlight: t('privacyRightsBlock.heading.highlight'),
      },
      subheading: t('privacyRightsBlock.subheading'),
    },
    privacyRetentionBlock: {
      heading: {
        secondPart: t('privacyRetentionBlock.heading.secondPart'),
        highlight: t('privacyRetentionBlock.heading.highlight'),
      },
      subheading: t('privacyRetentionBlock.subheading'),
    },
    privacyChangesBlock: {
      heading: {
        highlight: t('privacyChangesBlock.heading.highlight'),
      },
      subheading: t('privacyChangesBlock.subheading'),
    },
    privacyContactBlock: {
      heading: {
        highlight: t('privacyContactBlock.heading.highlight'),
      },
      subheading: t('privacyContactBlock.subheading'),
      link: [
        {
          toWrap: 'help@jardinbinario.com',
          link: 'help@jardinbinario.com',
        },
      ],
    },
    privacySharingBlock: {
      heading: {
        highlight: t('privacySharingBlock.heading.highlight'),
        secondPart: t('privacySharingBlock.heading.secondPart'),
      },
      subheading: t('privacySharingBlock.subheading'),
    },
  };


  return {
    texts,
    t,
  };
};


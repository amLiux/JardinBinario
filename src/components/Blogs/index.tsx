import { Fragment } from 'react';

import { CustomSwiper } from '@/components/Swiper';
import { BlogEntry } from '@/types/sharedTypes';

import blogsStyles from './Blogs.module.css';
import { BlogCard } from './BlogCard';

interface BlogsProps {
  recentBlogs: BlogEntry[];
  mostViewedBlogs: BlogEntry[];
  t: (key: string) => string;
}

const getSlidesToRender = (blogs: BlogEntry[]) =>
  blogs.map(
    ({
      title,
      author: { name, lastName, avatar },
      createdAt,
      views: blogViews,
      tags,
      _id,
      sneakpeak,
      shares: blogShares,
    }) => (
      <Fragment key={_id}>
        <BlogCard
          id={_id}
          title={title}
          name={name}
          lastName={lastName}
          avatar={avatar}
          createdAt={createdAt}
          blogShares={blogShares}
          blogViews={blogViews}
          tags={tags}
          sneakpeak={sneakpeak}
        />
      </Fragment>
    )
  );

export const Blogs = ({ recentBlogs, mostViewedBlogs, t }: BlogsProps) => {

  const toRender = [{
    headerText: {
      title: t('blogs.mostRecent.title'),
      highlight: t('blogs.mostRecent.highlight')
    },
    blogs: recentBlogs
  },
  {
    headerText: {
      title: t('blogs.mostViewed.title'),
      highlight: t('blogs.mostViewed.highlight')
    },
    blogs: mostViewedBlogs
  }
  ];

  return (
    <div className={blogsStyles.container}>
      {toRender.map((blogInfo) => (
        <CustomSwiper
          key={`swiper-${blogInfo.headerText.title}`}
          headerText={blogInfo.headerText}
          slidesPerView={{
            default: 1,
            640: 1,
            768: 1,
            1024: 2,
          }}
          autoplay
        >
          {getSlidesToRender(blogInfo.blogs)}
        </CustomSwiper>
      ))}
    </div>
  );
};

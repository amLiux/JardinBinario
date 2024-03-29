import { Fragment } from 'react';

import { CustomSwiper } from '@/components/Swiper';
import { BlogEntry } from '@/types/sharedTypes';

import blogsStyles from './Blogs.module.css';
import { BlogCard } from './BlogCard';

interface BlogsProps {
    recentBlogs: BlogEntry[]
    mostViewedBlogs: BlogEntry[]
}


const getSlidesToRender = (blogs: BlogEntry[]) => (
    blogs.map(({ title, author: { name, lastName, avatar }, createdAt, views: blogViews, tags, _id, sneakpeak, shares: blogShares }) =>
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

export const Blogs = ({ recentBlogs, mostViewedBlogs }: BlogsProps) => {
    return (
        <div className={blogsStyles.container}>
            <CustomSwiper
                title="Blogs más recientes:"
                slidesPerView={{
                    default: 1,
                    640: 1,
                    768: 1,
                    1024: 2,
                }}
                autoplay
            >
                {getSlidesToRender(recentBlogs)}
            </CustomSwiper>
            <CustomSwiper
                title="Blogs más vistos:"
                slidesPerView={{
                    default: 1,
                    640: 1,
                    768: 1,
                    1024: 2,
                }}
                autoplay
            >
                {getSlidesToRender(mostViewedBlogs)}
            </CustomSwiper>
        </div>
    );
};

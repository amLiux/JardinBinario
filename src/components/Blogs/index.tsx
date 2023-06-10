import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

import { CustomSwiper } from '@/components/Swiper';
import shares from '@/assets/buttons/shares.png';
import views from '@/assets/buttons/views.png';
import { BlogEntry } from '@/types/sharedTypes';

import blogsStyles from './Blogs.module.css';
import { Flexbox } from '../lib/Flexbox';

interface BlogsProps {
    recentBlogs: BlogEntry[]
    mostViewedBlogs: BlogEntry[]
}

const DEFAULT_WIDTH_HEIGTH = 32;

const getSlidesToRender = (blogs: BlogEntry[]) => (
    blogs.map(({ title, author: { name, lastName, avatar }, createdAt, views: blogViews, tags, id, sneakpeak, shares: blogShares }) =>
        <Fragment key={id}>
            <Link href={`/read/${id}`} passHref scroll>
                <div className={blogsStyles.blogCard}>
                    <h4 className={blogsStyles.blogTitle}>{title}</h4>
                    <p className={blogsStyles.sneakpeak}>
                        {sneakpeak}
                    </p>
                    <Flexbox justifyContent='start'>
                        <Flexbox extraClass={blogsStyles.identityCard}>
                            <div className={blogsStyles.profilePicContainer}>
                                <Image src={avatar} alt={`${name} ${lastName} profile pic`} layout='fill' objectFit='cover' />
                            </div>
                            <div className={blogsStyles.identityText} >
                                <p>{`${name} ${lastName}`}</p>
                                <p>{new Date(createdAt).toLocaleDateString('es-us', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                        </Flexbox>
                        <Flexbox extraClass={blogsStyles.statsContainer}>
                            <div className={blogsStyles.stats}>
                                <Image src={views} width={DEFAULT_WIDTH_HEIGTH} height={DEFAULT_WIDTH_HEIGTH} alt='like'></Image>
                                <p>{blogViews}</p>
                            </div>
                            <div className={blogsStyles.stats}>
                                <Image src={shares} width={DEFAULT_WIDTH_HEIGTH} height={DEFAULT_WIDTH_HEIGTH} alt='shares'></Image>
                                <p>{blogShares}</p>
                            </div>
                        </Flexbox>
                    </Flexbox>
                    <div className={blogsStyles.tagsContainer}>
                        {
                            tags.map((tag, idx) =>
                                <span key={`${tag}-${idx}`} className={blogsStyles.tag}>#{tag}</span>
                            )
                        }
                    </div>
                </div>
            </Link>
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

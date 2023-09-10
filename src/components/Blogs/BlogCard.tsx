import React from 'react';
import blogsStyles from './Blogs.module.css';
import { Flexbox } from '../lib/Flexbox';
import Image from 'next/image';
import shares from '@/assets/buttons/shares.svg';
import views from '@/assets/buttons/views.svg';
import Link from 'next/link';

const DEFAULT_WIDTH_HEIGTH = 32;

interface BlogCardProps {
    id: string;
    title: string;
    name: string;
    lastName: string;
    avatar: string;
    createdAt: string;
    blogShares: number;
    blogViews: number;
    tags: string[];
    sneakpeak: string;
    preview?: boolean;
}

export const BlogCard = ({
    title,
    sneakpeak,
    avatar,
    name,
    lastName,
    createdAt,
    blogViews,
    tags,
    blogShares,
    id,
    preview = false
}: BlogCardProps) => {
    return (
        <Link href={`/read/${id}`} passHref scroll>
            <div className={blogsStyles.blogCard}>
                <h4 className={blogsStyles.blogTitle}>{title}</h4>
                {/* TODO add min-height for the tags and identity box stay in one place */}
                <Flexbox alignItems='center' extraClass={blogsStyles.sneakpeak}>
                    <p >
                        {sneakpeak}
                    </p>
                </Flexbox>
                <Flexbox justifyContent='start'>
                    <Flexbox extraClass={blogsStyles.identityCard}>
                        <div className={blogsStyles.profilePicContainer}>
                            <Image src={avatar} alt={`${name} ${lastName} profile pic`} layout='fill' objectFit='cover' />
                        </div>
                        <div className={blogsStyles.identityText} >
                            <p>{`${name} ${lastName}`}</p>
                            <p className={blogsStyles.longDate}>{new Date(createdAt).toLocaleDateString('es-us', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            <p className={blogsStyles.shortDate}>{new Date(createdAt).toLocaleDateString('es-us')}</p>
                        </div>
                    </Flexbox>
                    <Flexbox justifyContent='center' alignItems='center' extraClass={blogsStyles.statsContainer}>
                        <div className={blogsStyles.stats}>
                            <Image src={views} width={DEFAULT_WIDTH_HEIGTH} height={DEFAULT_WIDTH_HEIGTH} alt='like'/>
                            <p>{blogViews}</p>
                        </div>
                        <div className={blogsStyles.stats}>
                            <Image src={shares} width={DEFAULT_WIDTH_HEIGTH} height={DEFAULT_WIDTH_HEIGTH} alt='shares'/>
                            <p>{blogShares}</p>
                        </div>
                    </Flexbox>
                </Flexbox>
                <div className={`${blogsStyles.tagsContainer} ${preview ? 'mt-2' : ''}`}>
                    {
                        tags.map((tag, idx) =>
                            <span key={`${tag}-${idx}`} className={blogsStyles.tag}>#{tag}</span>
                        )
                    }
                </div>
            </div>
        </Link>
    );
};

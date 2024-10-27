import React from 'react';
import Link from 'next/link';
import Image from 'next/legacy/image';

import { Flexbox } from '../lib/Flexbox';
import shares from '@/assets/buttons/shares.svg';
import views from '@/assets/buttons/views.svg';
import { Tags } from '@/components/Tags';
import { Profile } from '@/components/Profile';

import blogsStyles from './Blogs.module.css';

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
  preview = false,
}: BlogCardProps) => {
  return (
    <Link href={`/read/${id}`} passHref scroll>
      <div className={blogsStyles.blogCard}>
        <h4 className={blogsStyles.blogTitle}>{title}</h4>
        {/* TODO add min-height for the tags and identity box stay in one place */}
        <Flexbox alignItems="center" extraClass={blogsStyles.sneakpeak}>
          <p>{sneakpeak}</p>
        </Flexbox>
        <Flexbox justifyContent="start">
          <Profile user={{ avatar, name, lastName }} createdAt={createdAt} />
          <Flexbox
            justifyContent="center"
            alignItems="center"
            extraClass={blogsStyles.statsContainer}
          >
            <div className={blogsStyles.stats}>
              <Image
                src={views}
                width={DEFAULT_WIDTH_HEIGTH}
                height={DEFAULT_WIDTH_HEIGTH}
                alt="like"
              />
              <p>{blogViews}</p>
            </div>
            <div className={blogsStyles.stats}>
              <Image
                src={shares}
                width={DEFAULT_WIDTH_HEIGTH}
                height={DEFAULT_WIDTH_HEIGTH}
                alt="shares"
              />
              <p>{blogShares}</p>
            </div>
          </Flexbox>
        </Flexbox>
        <Tags tags={tags} preview={preview} />
      </div>
    </Link>
  );
};

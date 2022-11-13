import Image from 'next/image';
import Link from 'next/link';

import { CustomSwiper } from '@/components/Swiper';
import likes from '@/assets/buttons/likes.png';
import views from '@/assets/buttons/views.png';
import { BlogEntry } from '@/types/sharedTypes';

import blogsStyles from './Blogs.module.css';

interface CustomSwiperProps {
    recentBlogs: BlogEntry[]
    mostViewedBlogs: BlogEntry[]
}

const DEFAULT_WIDTH_HEIGTH = 32;

const getSlidesToRender = (blogs: BlogEntry[]) => (
    blogs.map(({ title, author: { name, lastName, avatar }, createdAt, views: blogViews, tags, id, markdown }, idx) =>
        <>
            <Link href={`/read?blogId=${id}`} passHref scroll>
                <div className={blogsStyles.blogCard}>
                    <h4 className={blogsStyles.blogTitle}>{title}</h4>
                    <p className={blogsStyles.sneakpeak}>
                        Agregar un nuevo field cuando se agrega el field para agregar el sneakpeak, siento que es mejor poner un sneakpeak llamativo que llame al usuario, rather than usar el inicio del blog
                    </p>
                    <div className={blogsStyles.identityContainer}>
                        <div className={blogsStyles.identityCard}>
                            <div className={blogsStyles.profilePicContainer}>
                                <Image src={avatar} alt={`${name} ${lastName} profile pic`} layout='fill' objectFit='cover' />
                            </div>
                            <div className={blogsStyles.identityText} >
                                <p>{`${name} ${lastName}`}</p>
                                <p>{new Date(createdAt).toLocaleDateString('es-us', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                        </div>
                        <div className={blogsStyles.statsContainer}>
                            <div className={blogsStyles.stats}>
                                <Image src={views} width={DEFAULT_WIDTH_HEIGTH} height={DEFAULT_WIDTH_HEIGTH} alt='like'></Image>
                                <p>{blogViews}</p>
                            </div>
                            <div className={blogsStyles.stats}>
                                <Image src={likes} width={DEFAULT_WIDTH_HEIGTH} height={DEFAULT_WIDTH_HEIGTH} alt='like'></Image>
                                <p>4.1k</p>
                            </div>
                        </div>
                    </div>
                    <div className={blogsStyles.tagsContainer}>
                        {
                            tags.map((tag, idx) =>
                                <span key={`${tag}-${idx}`} className={blogsStyles.tag}>#{tag}</span>
                            )
                        }
                    </div>
                </div>
            </Link>
        </>
    )
);

export const Blogs = ({ recentBlogs, mostViewedBlogs }: CustomSwiperProps) => {
    return (
        <div className={blogsStyles.container}>
            <CustomSwiper
                title="Blogs más recientes:"
                slidesPerView={{
                    default: 2,
                    640: 2,
                    768: 2,
                    1024: 2,
                }}
                autoplay
            >
                {getSlidesToRender(recentBlogs)}
            </CustomSwiper>
            <CustomSwiper
                title="Blogs más vistos:"
                slidesPerView={{
                    default: 2,
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

import React from 'react';
import { NextRouter, useRouter } from 'next/router';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import customSwiperStyles from './CustomSwiper.module.css';
import ticketFormStyles from '../TicketForm/TicketForm.module.css';
import pic from '../../public/pic.jpeg';
import likes from '../../public/buttons/likes.png';
import views from '../../public/buttons/views.png';
import { BlogEntry } from '../../types/sharedTypes';

interface CustomSwiperProps {
    recentBlogs: BlogEntry[]
    mostViewedBlogs: BlogEntry[]
}

const DEFAULT_WIDTH_HEIGTH = 32;

const getSlidesToRender = (blogs: BlogEntry[], router: NextRouter) => (
    blogs.map(({ title, author: { name, lastName }, createdAt, views: blogViews, tags, id }, idx) =>
        <SwiperSlide
            onClick={
                () => router.push({
                    pathname: `/read`,
                    query: { 'blogId': id }
                })
            }
            key={idx}>
            <div className={customSwiperStyles.blogCard}>
                <h4 className={customSwiperStyles.blogTitle}>{title}</h4>
                <p className={customSwiperStyles.sneakpeak}>Después de investigar sobre las tendencias en el mercado en cuanto a cómo crear una buena estructura de pruebas para aplicaciones...</p>
                <div className={customSwiperStyles.identityContainer}>
                    <div className={customSwiperStyles.identityCard}>
                        <div className={customSwiperStyles.profilePicContainer}>
                            <Image src={pic} alt="myself" layout='intrinsic' />
                        </div>
                        <div className={customSwiperStyles.identityText} >
                            <p>{`${name} ${lastName}`}</p>
                            <p>{new Date(createdAt).toLocaleDateString('es-us', { year: "numeric", month: "long", day: "numeric" })}</p>
                        </div>
                    </div>
                    <div className={customSwiperStyles.statsContainer}>
                        <div className={customSwiperStyles.stats}>
                            <Image src={views} width={DEFAULT_WIDTH_HEIGTH} height={DEFAULT_WIDTH_HEIGTH} alt='like'></Image>
                            <p>{blogViews}</p>
                        </div>
                        <div className={customSwiperStyles.stats}>
                            <Image src={likes} width={DEFAULT_WIDTH_HEIGTH} height={DEFAULT_WIDTH_HEIGTH} alt='like'></Image>
                            <p>4.1k</p>
                        </div>
                    </div>
                </div>
                <div className={customSwiperStyles.tagsContainer}>
                    {
                        tags.map((tag, idx) =>
                            <span key={`${tag}-${idx}`} className={customSwiperStyles.tag}>#{tag}</span>
                        )
                    }
                </div>
            </div>
        </SwiperSlide>
    )
)

export const CustomSwiper = ({ recentBlogs, mostViewedBlogs }: CustomSwiperProps) => {
    const router = useRouter();

    return (
        <div className={customSwiperStyles.container}>
            <span className={ticketFormStyles.coolHeading} >
                <h3>Blogs más recientes:</h3>
            </span>
            <div className={customSwiperStyles.swiperContainer}>
                <Swiper
                    spaceBetween={45}
                    slidesPerView={2}
                >
                    {getSlidesToRender(recentBlogs, router)}
                </Swiper>
            </div>
            <span className={ticketFormStyles.coolHeading}>
                <h3>Blogs más vistos:</h3>
            </span>
            <div className={customSwiperStyles.swiperContainer}>
                <Swiper
                    spaceBetween={45}
                    slidesPerView={2}
                >
                    {getSlidesToRender(mostViewedBlogs, router)}
                </Swiper>
            </div>
        </div>
    )
}
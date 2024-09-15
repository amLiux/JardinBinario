import React from 'react';
import Image from 'next/image';
import { Flexbox } from '../lib/Flexbox';
import profileStyles from './Profile.module.css';

interface ProfileProps {
    user: {
        name: string;
        lastName: string;
        avatar: string;
    }
    createdAt: string;
}

export const Profile = ({ user: { avatar, name, lastName }, createdAt = new Date().toUTCString() }: ProfileProps) => {
    return (
        <Flexbox extraClass={profileStyles.identityCard}>
            <div className={profileStyles.profilePicContainer}>
                <Image src={avatar} alt={`${name} ${lastName} profile pic`} layout='fill' objectFit='cover' />
            </div>
            <div className={profileStyles.identityText} >
                <p>{`${name} ${lastName}`}</p>
                <p className={profileStyles.longDate}>{new Date(Number(createdAt)).toLocaleDateString('es-us', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className={profileStyles.shortDate}>{new Date(Number(createdAt)).toLocaleDateString('es-us')}</p>
            </div>
        </Flexbox>
    );
};

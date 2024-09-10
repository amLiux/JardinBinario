import React from 'react'
import { Icons } from '../Icons'
import { Flexbox } from '../lib/Flexbox'
import sidebarStyles from './Sidebar.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {}

export const Sidebar = (props: Props) => {
  const { asPath } = useRouter();
  return (
    <div className={sidebarStyles.container}>
      <ul>
        {
          // TODO let's think about an admin site map
          ['Blogs', 'Users', 'Tickets'].map((route) => {
            const active = asPath === `/admin/${route.toLowerCase()}`;

            return (
              <li
                className={`${sidebarStyles.link} ${active ? 'bg-white text-slate-900' : ''}`}>
                <Link href={`/admin/${route.toLowerCase()}`} passHref scroll>
                  <Flexbox>
                    {route}
                    {Icons[route.toUpperCase()]}
                  </Flexbox>

                </Link>
              </li>
            )
          })
        }
      </ul>
      <hr className='max-h-[.1rem]' />
    </div>
  )
}
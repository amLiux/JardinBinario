import Link from 'next/link';
import { useRouter } from 'next/router';
import { Logo } from '@/components/Logo';
import { Flexbox } from '@/components/lib/Flexbox';
import sidebarStyles from './Sidebar.module.css';
import { ArrowLeftStartOnRectangleIcon, ChartBarIcon, ClipboardDocumentListIcon, Cog6ToothIcon, TicketIcon, UserGroupIcon } from '@heroicons/react/24/outline';

// TODO for now this is good, we might think on inject this over later on 
const routes = [
  { name: 'Blogs', href: '/admin/blogs', icon: <ClipboardDocumentListIcon className={sidebarStyles.icon} /> },
  { name: 'Usuarios', href: '/admin/users', icon: <UserGroupIcon className={sidebarStyles.icon} /> },
  { name: 'Tiquetes', href: '/admin/tickets', icon: <TicketIcon className={sidebarStyles.icon} /> },
  { name: 'Análisis', href: '/admin/stats', icon: <ChartBarIcon className={sidebarStyles.icon} /> },
];

const user = {
  name: 'Marcelo Araya',
  email: 'marceliux@jb.com',
  avatar:
    'https://res.cloudinary.com/drrcrnuln/image/upload/v1663917874/jardin-binario-avatars/tnnsfianejdgiird5ol4.jpg',
};

export const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className={sidebarStyles.container}>
      <Flexbox>
        <Logo router={router} />
      </Flexbox>
      <div className={sidebarStyles.routesContainer}>
        <nav className={sidebarStyles.routes}>
          {routes.map((route) => {
            const isActive = router.pathname === route.href;
            return (
              <Link key={route.name} href={route.href} passHref>
                <a
                  className={`${sidebarStyles.route} ${
                    isActive
                      ? sidebarStyles.activeRoute
                      : sidebarStyles.hoverRoute
                  }`}
                >

                  {route.icon}
                  <span className={sidebarStyles.routeText}>{route.name}</span>
                </a>
              </Link>
            );
          })}
        </nav>

        <div className={sidebarStyles.profileAndSettings}>
        <Link href="/admin/settings" passHref>
            <a className={`${sidebarStyles.route} ${sidebarStyles.hoverRoute}`}>
              <Cog6ToothIcon className={sidebarStyles.icon} />
              <span className={sidebarStyles.routeText}>Ajustes</span>
            </a>
          </Link>
          <div className={sidebarStyles.profile}>
            <div className={sidebarStyles.profileTexts}>
              {/* TODO: Maybe add a profile pic? should we abstract this to use it in blogs table/ blog read, blog cards? we need to standardize the profile... */}
              <div>
                <h3 className={sidebarStyles.name}>{user.name}</h3>
                <p className={sidebarStyles.email}>{user.email}</p>
              </div>
            </div>
            <button aria-label="Log out" className={sidebarStyles.logout}>
              <ArrowLeftStartOnRectangleIcon className={sidebarStyles.icon} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

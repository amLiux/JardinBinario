import Link from 'next/link';
import { useRouter } from 'next/router';
import { Icons } from '@/components/Icons';
import { Logo } from '@/components/Logo';
import { Flexbox } from '@/components/lib/Flexbox';
import sidebarStyles from './Sidebar.module.css';

// TODO for now this is good, we might think on inject this over later on 
const routes = [
  { name: 'Blogs', href: '/admin/blogs' },
  { name: 'Usuarios', href: '/admin/users' },
  { name: 'Tiquetes', href: '/admin/tickets' },
  { name: 'Análisis', href: '/admin/stats' },
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
                  {Icons[route.name.toUpperCase()]}
                  <span className={sidebarStyles.routeText}>{route.name}</span>
                </a>
              </Link>
            );
          })}
        </nav>

        <div className={sidebarStyles.profileAndSettings}>
        <Link href="/admin/settings" passHref>
            <a className={`${sidebarStyles.route} ${sidebarStyles.hoverRoute}`}>
              {Icons.SETTINGS}
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
              {Icons.LOGOUT}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

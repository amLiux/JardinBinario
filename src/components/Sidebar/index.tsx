import Link from 'next/link';
import { useRouter } from 'next/router';
import { Icons } from '@/components/Icons';
import { Logo } from '@/components/Logo';
import { Flexbox } from '@/components/lib/Flexbox';
import sidebarStyles from './Sidebar.module.css';

const routes = [
  { name: 'Blogs', href: '/admin/blogs' },
  { name: 'Usuarios', href: '/admin/users' },
  { name: 'Tiquetes', href: '/admin/tickets' },
];

const user = {
  name: 'John Doe',
  email: 'john@example.com',
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
      {/* TODO finish abstracting styles */}
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="space-y-3">
          {routes.map((route) => {
            const isActive = router.pathname === route.href;
            return (
              <Link key={route.name} href={route.href} passHref>
                <a
                  className={`flex items-center px-4 py-2 text-gray-300 transition-colors duration-300 transform rounded-lg ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-700 hover:text-gray-200'
                  }`}
                >
                  {Icons[route.name.toUpperCase()]}
                  <span className="mx-4 font-medium">{route.name}</span>
                </a>
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 space-y-3">
          <Link href="/admin/settings" passHref>
            <a className="flex items-center px-4 py-2 text-gray-300 transition-colors duration-300 transform rounded-lg hover:bg-gray-800 hover:text-gray-200">
              {Icons.SETTINGS}
              <span className="mx-4 font-medium">Settings</span>
            </a>
          </Link>
          <div className="flex items-center justify-between p-4 mt-6 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              {/* <Image src={user.avatar} alt={`profile pic`} layout='fill' objectFit='cover' /> */}
              <div>
                <h3 className="text-sm font-medium text-white">{user.name}</h3>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
            </div>
            <button
              aria-label="Log out"
              className="p-2 text-gray-400 rounded-lg hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              {/* <LogOut className="w-5 h-5" /> */}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

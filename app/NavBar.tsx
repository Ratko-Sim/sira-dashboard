'use client';

import classnames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';

export default function NavBar() {
  const currentPath = usePathname();

  const links = [
    {
      label: 'Dashboard',
      href: '/',
    },
    {
      label: 'Issues',
      href: '/issues',
    },
  ];

  return (
    <nav className='flex items-center space-x-6 border-b mb-5 px-5 h-14'>
      <Link href='/'>
        <AiFillBug />
      </Link>
      <ul className='flex space-x-6'>
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link
              className={classnames({
                'text-zinc-900': currentPath === href,
                'text-zinc-500': currentPath !== href,
                'hover:text-zinc-800 transition-colors': true,
              })}
              href={href}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

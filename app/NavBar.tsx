'use client';

import { Skeleton } from '@/app/components/index';
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from '@radix-ui/themes';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';

export default function NavBar() {
  return (
    <nav className='border-b mb-5 px-5 flex items-center min-h-[65px]'>
      <Container>
        <Flex justify={'between'}>
          <Flex
            align={'center'}
            gap={'5'}
          >
            <Link href='/'>
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
}

function NavLinks() {
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
    <ul className='flex space-x-6'>
      {links.map(({ label, href }) => (
        <li key={href}>
          <Link
            className={classnames({
              'nav-link': true,
              '!text-zinc-900': currentPath === href,
            })}
            href={href}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function AuthStatus() {
  const { status, data: session } = useSession();

  if (status === 'loading') return <Skeleton width={'3rem'} />;

  if (status === 'unauthenticated')
    return (
      <Link
        className='nav-link'
        href='/api/auth/signin'
      >
        Sign in
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback='?'
            size={'2'}
            radius={'full'}
            className='cursor-pointer'
            referrerPolicy='no-referrer'
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align={'end'}>
          <DropdownMenu.Label>
            <Text size={'2'}>{session!.user!.email!}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href='/api/auth/signout'>Sign out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
}

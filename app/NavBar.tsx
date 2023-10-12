'use client';

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
  const currentPath = usePathname();
  const { status, data: session } = useSession();

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
    <nav className='border-b mb-5 px-5 py-4'>
      <Container>
        <Flex justify={'between'}>
          <Flex
            align={'center'}
            gap={'5'}
          >
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
          </Flex>
          <Box>
            {status === 'authenticated' && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user!.image!}
                    fallback='?'
                    size={'2'}
                    radius={'full'}
                    className='cursor-pointer'
                    referrerPolicy='no-referrer'
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content align={'end'}>
                  <DropdownMenu.Label>
                    <Text size={'2'}>{session.user!.email!}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href='/api/auth/signout'>Sign out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}

            {status === 'unauthenticated' && (
              <Link href='/api/auth/signin'>Sign in</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
}

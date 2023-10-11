import Link from "next/link";
import { AiFillBug } from "react-icons/ai";

export default function NavBar() {
  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues",
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
              className='text-zinc-500 hover:text-zinc-800 transition-colors'
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

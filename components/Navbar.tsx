'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 mb-8">
      <ul className="flex space-x-6">
        <li>
          <Link
            href="/table"
            className={clsx(
              'hover:underline',
              pathname === '/table' ? 'text-yellow-300 font-semibold' : ''
            )}
          >
            Таблиця
          </Link>
        </li>
        <li>
          <Link
            href="/list"
            className={clsx(
              'hover:underline',
              pathname === '/list' ? 'text-yellow-300 font-semibold' : ''
            )}
          >
            Список
          </Link>
        </li>
      </ul>
    </nav>
  );
}

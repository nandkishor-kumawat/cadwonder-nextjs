"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MenuIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';

const MenuItems = ({ session }: { session: any }) => {
    const { theme } = useTheme()
    const pathname = usePathname();

    const navLinks = [
        {
            name: 'Questions',
            href: '/questions',
            current: pathname === '/questions',
        },
        {
            name: 'Users',
            href: '/users',
            current: pathname === '/users',
        },
        {
            name: 'Library',
            href: '/library',
            current: pathname === '/library',
        },
        {
            name: 'Dashboard',
            href: '/dashboard',
            current: pathname === '/dashboard',
        },
    ]



    return (
        <>
            <div className='sm:hidden block'>
                <DropdownMenu >
                    <DropdownMenuTrigger>
                        <MenuIcon className='text-white' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='sm:hidden block p-2 '>
                        {navLinks.map((link, index) => (
                            <Link key={index} className={`hover:text-orange-400 text-${link.current ? 'white' : theme === 'dark' ? 'white' : 'black'}`} href={link.href}>
                                <DropdownMenuItem className={`cursor-pointer my-1  ${link.current ? 'bg-[#3b3b3b]' : ''}`}>
                                    {link.name}
                                </DropdownMenuItem>
                            </Link>
                        ))}

                        {!session ? <Link href='/login' className="bg-orange-400 text-white  px-3 py-1 mt-2 focus:outline-none hover:bg-orange-500 rounded text-base">Login</Link>
                            : <Link href={'/api/auth/signout'} className="bg-orange-400 text-white  px-3 py-1 mt-2 focus:outline-none hover:bg-orange-500 rounded text-base">Logout</Link>}

                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className='hidden sm:flex items-center gap-4'>
                {navLinks.map((link, index) => (
                    <Link key={index} href={link.href} className={`hover:text-orange-400 text-white ${link.current ? 'text-orange-400' : ''}`}>{link.name}</Link>
                ))}
                {!session ? <Link href='/login' className="bg-orange-400 text-white  px-3 py-1 focus:outline-none hover:bg-orange-500 rounded text-base">Login</Link>
                    : <Link href={'/api/auth/signout'} className="bg-orange-400 text-white  px-3 py-1 focus:outline-none hover:bg-orange-500 rounded text-base">Logout</Link>}

            </div>
        </>

    )
}

export default MenuItems
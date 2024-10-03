"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useMemo } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MenuIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { AiFillLike } from 'react-icons/ai';
import { BiCube } from 'react-icons/bi';
import { MdLogout } from 'react-icons/md';
import { useSession } from '@/hooks';
import { authActions } from '@/actions';
import { NavItem } from '../ui/nav-item';
import { Role } from '@prisma/client';


const MenuItems = () => {

  const router = useRouter();

  const { session } = useSession();

  const handleLogout = async () => {
    await authActions.signOut();

    router.push('/login');
  }

  const navLinks = useMemo(() => {
    const links = [
      { name: 'Home', href: '/', },
      { name: 'Questions', href: '/questions', },
      // { name: 'Users', href: '/users', },
      { name: 'Library', href: '/library', },
      { name: 'Dashboard', href: '/dashboard', },
    ]
    if (session?.user?.role !== Role.ADMIN) links.pop();
    return links;
  }, [session])

  const UserLinks = () => {
    return (
      <ul className='flex flex-col px-3 py-2 bg-slate-600'>
        <li>
          <DropdownMenuItem className='bg-transparent hover:bg-transparent focus:bg-transparent text-base'>
            <NavItem href={`/${session?.user?.username}`} className={`flex items-center gap-2`}>
              <Avatar className='h-5 w-5'>
                <AvatarImage src={session?.user?.profilePicture as string} />
                <AvatarFallback className='text-xs'>{session?.user?.name?.[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <p>My Profile</p>
            </NavItem>
          </DropdownMenuItem>
        </li>
        <li>
          <DropdownMenuItem className='bg-transparent hover:bg-transparent focus:bg-transparent text-base'>
            <NavItem href={`/${session?.user?.username}/models`} className={`flex items-center gap-2`}>
              <BiCube />
              My Models
            </NavItem>
          </DropdownMenuItem>
        </li>
        <li>
          <DropdownMenuItem className='bg-transparent hover:bg-transparent focus:bg-transparent text-base'>
            <NavItem href={`/${session?.user?.username}/likes`} className={`flex items-center gap-2`}>
              <AiFillLike />
              <p>My Likes</p>
            </NavItem>
          </DropdownMenuItem>
        </li>
        <li>
          <DropdownMenuItem className='mb-1 bg-transparent hover:bg-transparent focus:bg-transparent text-base'>
            <button onClick={handleLogout} className={`hover:text-orange-400 text-white flex items-center gap-2`}>
              <MdLogout />
              <p>Logout</p>
            </button>
          </DropdownMenuItem>
        </li>
      </ul>
    )
  }

  return (
    <>
      <div className='sm:hidden block'>
        <DropdownMenu >
          <DropdownMenuTrigger className='outline-none active:outline-none cursor-pointer'>
            <MenuIcon className='text-white' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='sm:hidden block rounded-none border-none mt-4 p-0 max-w-sm w-48'>
            <div className="px-4 py-2">
              <ul className='flex flex-col gap-2'>
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <NavItem href={link.href} className='text-black'>
                      {(isActive) => (
                        <DropdownMenuItem className={`cursor-pointer  ${isActive && 'bg-[#3b3b3b] text-orange-400'}`}>
                          {link.name}
                        </DropdownMenuItem>
                      )}
                    </NavItem>
                  </li>
                ))}
                {!(session) && (
                  <Link href='/login' className="bg-orange-400 text-white mb-2 px-3 py-1 focus:outline-none hover:bg-orange-500 rounded text-base">Login</Link>
                )}
              </ul>
            </div>

            {(session) && <UserLinks />}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>


      <div className='hidden sm:flex items-center gap-4'>
        {navLinks.map((link, index) => (
          <NavItem key={index} href={link.href} className='text-lg'>
            {link.name}
          </NavItem>
        ))}

        {!(session) && (
          <Link href='/login' className="bg-orange-400 text-white px-3 py-1 focus:outline-none hover:bg-orange-500 rounded text-base">Login</Link>
        )}

        {(session) && (
          <DropdownMenu >
            <DropdownMenuTrigger className='outline-none active:outline-none'>
              <Avatar className='h-8 w-8 cursor-pointer static'>
                <AvatarImage src={session?.user?.profilePicture as string} />
                <AvatarFallback className=''>{session?.user?.name?.[0].toUpperCase()}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-slate-600 rounded-none border-none mt-2'>
              {<UserLinks />}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

      </div>
    </>

  )
}

export default MenuItems
import { bg1 } from '@/data/colors';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import logo from '../../../public/logo.png'
import MenuItems from './menu-items';

async function Navbar() {

    return (
        <header className="text-gray-600 body-font sticky top-0 flex h-header z-10" style={{ backgroundColor: bg1 }}>
            <div className="w-full flex px-4 py-2 items-center justify-between mx-auto max-w-screen-lg">
                <Link href="/" className="text-2xl title-font font-medium items-center text-white flex gap-2">
                    <Image
                        className='rounded-[.575rem] p-0.5 bg-slate-800'
                        src={logo}
                        width={35}
                        height={35}
                        alt='logo'
                    />
                    <p>CadWonder</p>
                </Link>

                <div className='relative' >
                    <div className='flex items-center gap-4 px-3'>
                        <MenuItems />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar

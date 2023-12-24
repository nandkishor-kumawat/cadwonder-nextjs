import { bg1 } from '@/lib/data/colors';
import { getServerSession } from 'next-auth'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import logo from '../../../public/logo.png'
import MenuItems from './MenuItems';

async function Navbar() {
    const session = await getServerSession();


    return (
        <header className="text-gray-600 body-font sticky top-0  z-10 border-b-[silver] border-b" style={{ backgroundColor: bg1 }}>
            <div className="w-full flex px-4 py-2 items-center justify-between">
                <Link href="/" className="text-2xl title-font font-medium items-center text-white flex gap-1">
                    <Image style={{
                        backgroundColor: 'rgb(41, 52, 64)',
                        borderRadius: '0.575rem',
                        padding: '0.125rem'
                    }} src={logo} width={35} height={35} alt='logo' />
                    <p>CadWonder</p>
                </Link>

                <div className='relative' >
                    <div className='flex items-center gap-4 px-3'>
                        <MenuItems session={session} />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar

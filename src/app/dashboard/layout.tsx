import Link from 'next/link'
import React from 'react'

const layout = ({
    children
}: {
    children: React.ReactNode
}) => {
    const nodes = [
        {
            name: "Home",
            href: '/'
        },
        {
            name: 'Questions',
            href: '/questions'
        },
        {
            name: 'Models',
            href: '/models'
        },
    ].map(node => ({
        ...node,
        href: `/dashboard${node.href}`
    }))


    return (
        <div className='min-h-body w-full bg-slate-300'>
            <div className="flex h-full">
                <aside className='flex-auto max-w-sm border-r border-r-zinc-200 h-body sticky top-0'>
                    <div className="flex flex-col px-3 py-4">
                        {nodes.map((node, index) => (
                            <Link key={index} href={`${node.href}`} className='py-3 px-4 hover:bg-slate-500 transition-all duration-150 ease-in-out'>
                                {node.name}
                            </Link>
                        ))}
                    </div>
                </aside>
                <main className='flex-grow p-2 h-full overflow-y-auto scrollbar'>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default layout

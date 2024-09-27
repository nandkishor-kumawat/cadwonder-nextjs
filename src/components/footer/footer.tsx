import Link from 'next/link'
import React from 'react'

export const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">

                <div>
                    <h3 className="text-lg font-semibold mb-4">About Us</h3>
                    <ul>
                        <li><Link href="#" className="hover:underline">Company Information</Link></li>
                        <li><Link href="#" className="hover:underline">Careers</Link></li>
                        <li><Link href="#" className="hover:underline">Press</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Services</h3>
                    <ul>
                        <li><Link href="#" className="hover:underline">Study Help</Link></li>
                        <li><Link href="#" className="hover:underline">Textbook Solutions</Link></li>
                        <li><Link href="#" className="hover:underline">Math Solver</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Support</h3>
                    <ul>
                        <li><Link href="#" className="hover:underline">Contact Us</Link></li>
                        <li><Link href="#" className="hover:underline">Help Center</Link></li>
                        <li><Link href="#" className="hover:underline">Accessibility</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
                    <div className="flex space-x-4">
                        <Link href="#" className="text-blue-500 hover:text-blue-400">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 0H1.46A1.46 1.46 0 000 1.46v21.08A1.46 1.46 0 001.46 24h11.38V14.71h-3.1v-3.6h3.1V8.2c0-3.09 1.88-4.79 4.64-4.79 1.32 0 2.45.1 2.77.14v3.22h-1.9c-1.5 0-1.8.72-1.8 1.77v2.32h3.6l-.47 3.6h-3.13V24h6.13A1.46 1.46 0 0024 22.54V1.46A1.46 1.46 0 0022.54 0z" /></svg>
                        </Link>
                        <Link href="#" className="text-blue-400 hover:text-blue-300">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c-5.52 0-10 4.48-10 10 0 4.42 3.59 8.07 8.19 8.78.6.11.82-.26.82-.57v-2.01c-3.33.72-4.04-1.45-4.04-1.45-.55-1.41-1.34-1.78-1.34-1.78-1.09-.75.08-.73.08-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.82 1.3 3.51.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013.01-.4c1.02.01 2.04.14 3.01.4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.78.84 1.24 1.91 1.24 3.22 0 4.61-2.82 5.62-5.5 5.92.43.37.82 1.1.82 2.22v3.28c0 .31.22.68.82.57 4.61-.72 8.2-4.37 8.2-8.78 0-5.52-4.48-10-10-10z" /></svg>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container mx-auto mt-8 px-6 text-sm text-gray-400">
                <p>&copy; 2024 CadWonder. All rights reserved.</p>
                <div className="flex space-x-4 mt-4">
                    <Link href="/terms-and-conditions" className="hover:underline">Terms of Service</Link>
                    <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
                    {/* <Link href="#" className="hover:underline">Cookie Policy</Link> */}
                </div>
            </div>
        </footer>

    )
}
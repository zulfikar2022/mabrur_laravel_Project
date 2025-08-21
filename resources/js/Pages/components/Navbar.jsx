import { Link } from "@inertiajs/react";
import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 bg-white shadow z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href={route('home')} className="flex items-center">
                            <div className="h-14 w-14 mr-2">
                                <img
                                    className="overflow-hidden"
                                    src="./images/logo.png"
                                    alt="Logo"
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6 ml-auto">
                        <Link
                            href={route('home')}
                            className="text-gray-700 hover:text-blue-600 font-medium"
                        >
                            হোম
                        </Link>
                        <Link
                            href={route('home')}
                            className="hover:text-blue-600 font-medium text-gray-700"
                        >
                            খেজুর
                        </Link>
                        <Link
                            href={route('home')}
                            className="hover:text-blue-600 font-medium underline text-blue-600"
                        >
                            বাদাম
                        </Link>
                        <Link
                            href={route('home')}
                            className="text-gray-700 hover:text-blue-600 font-medium"
                        >
                            যোগাযোগ
                        </Link>
                        <Link
                            href={route('home')}
                            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                            Login
                        </Link>
                    </div>

                    {/* Hamburger */}
                    <div className="md:hidden flex items-center ml-auto">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
                        >
                            {isOpen ? (
                                // Close icon
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                // Menu icon
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2">
                    <Link
                        href={route('home')}
                        className="block text-gray-700 hover:text-blue-600 font-medium"
                    >
                        হোম
                    </Link>
                    <Link
                        href={route('home')}
                        className="block py-2 hover:text-blue-600 font-medium text-gray-700"
                    >
                        খেজুর
                    </Link>
                    <Link
                        href={route('home')}
                        className="block hover:text-blue-600 font-medium underline text-blue-600"
                    >
                        বাদাম
                    </Link>
                    <Link
                        href={route('home')}
                        className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
                    >
                        যোগাযোগ
                    </Link>
                    <Link
                        href={route('home')}
                        className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Login
                    </Link>
                </div>
            )}
        </nav>
    );
}

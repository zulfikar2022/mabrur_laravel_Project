import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import NavigationSideBar from "./NavigationSideBar";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { url } = usePage();
    console.log("Current URL:", url); // Debugging line to check the current URL

    return (
        <nav className="sticky top-0 bg-white shadow z-50 rounded">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link
                            href={route("home")}
                            className="flex items-center"
                        >
                            <div className="h-14 w-14 mr-2">
                                <img
                                    className="overflow-hidden"
                                    src="/images/logo.png"
                                    alt="Logo"
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6 ml-auto">
                        <Link
                            href={route("home")}
                            className="text-blue-500 hover:text-blue-600 underline  font-medium"
                        >
                            হোম
                        </Link>
                        <Link
                            href={route("home")}
                            className="hover:text-blue-600 font-medium text-gray-700"
                        >
                            খেজুর
                        </Link>
                        <Link
                            href={route("home")}
                            className="hover:text-blue-600 text-gray-700 font-medium "
                        >
                            বাদাম
                        </Link>
                        <Link
                            href={route("my-order")}
                            className="hover:text-blue-600 text-gray-700 font-medium "
                        >
                            আমার অর্ডার
                        </Link>
                        <Link
                            href={route("home")}
                            className="text-gray-700 hover:text-blue-600  font-medium"
                        >
                            যোগাযোগ
                        </Link>
                    </div>

                    <div className="md:hidden flex items-center ml-auto">
                        <div className="drawer drawer-end">
                            <input
                                id="my-drawer-6"
                                type="checkbox"
                                className="drawer-toggle"
                            />
                            <div className="drawer-content">
                                {/* Page content here */}
                                <label
                                    htmlFor="my-drawer-6"
                                    className="drawer-button btn btn-primary  bg-gray-200  text-blue-600 border-transparent"
                                >
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
                                </label>
                            </div>
                            <NavigationSideBar />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

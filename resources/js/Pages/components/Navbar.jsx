import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import NavigationSideBar from "./NavigationSideBar";
import TopBar from "./TopBar";

export default function Navbar({ user }) {
    const [isOpen, setIsOpen] = useState(false);
    const { url } = usePage();
    console.log("Current URL:", url); // Debugging line to check the current URL

    return (
        <nav className="sticky top-0 z-50 rounded">
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
                                    className="overflow-hidden rounded"
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
                            className={`${
                                url === "/"
                                    ? "text-white underline"
                                    : "text-gray-700"
                            } hover:text-white text-black font-bold text-xl`}
                        >
                            হোম
                        </Link>
                        <Link
                            href={route("products.khejur")}
                            className={`hover:text-white text-black font-bold text-xl ${
                                url === "/products/specific/khejur"
                                    ? "text-white underline"
                                    : "text-gray-700"
                            }`}
                        >
                            খেজুর
                        </Link>
                        <Link
                            href={route("products.badam")}
                            className={`hover:text-white text-black font-bold text-xl  ${
                                url === "/products/specific/badam"
                                    ? "text-white underline"
                                    : "text-gray-700"
                            }`}
                        >
                            বাদাম
                        </Link>
                        {(!user || user?.isAdmin) && ( //TODO: have to inver the logic
                            <Link
                                href={route("my-order")}
                                className={`hover:text-white text-black font-bold text-xl  ${
                                    url === "/my-order"
                                        ? "text-white underline"
                                        : "text-gray-700"
                                }`}
                            >
                                আমার অর্ডার
                            </Link>
                        )}
                        <Link
                            href={route("contact")}
                            className={`hover:text-white text-black font-bold text-xl  ${
                                url === "/contact"
                                    ? "text-white underline"
                                    : "text-gray-700"
                            }`}
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

import { Link } from "@inertiajs/react";

export default function NavigationSideBar() {
    return (
        <div className="drawer-side z-50">
            <label
                htmlFor="my-drawer-6"
                aria-label="close sidebar"
                className="drawer-overlay"
            ></label>
            <ul className="menu bg-[#f3f4f6] text-base-content min-h-full w-80 p-4">
                <div className="flex justify-between items-center mb-4">
                    <p></p>
                    <label
                        htmlFor="my-drawer-6"
                        className="drawer-button btn btn-primary bg-gray-200 text-red-700 border-transparent"
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
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </label>
                </div>
                <Link
                    href={route("home")}
                    className="block text-gray-700 pt-2 hover:text-blue-600 underline text-xl"
                >
                    হোম
                </Link>
                <hr />
                <Link
                    href={route("home")}
                    className="block pt-2 hover:text-blue-600 font-medium text-gray-700  text-xl"
                >
                    খেজুর
                </Link>
                <hr />
                <Link
                    href={route("home")}
                    className="block pt-2 hover:text-blue-600 font-medium  text-blue-600 text-xl"
                >
                    বাদাম
                </Link>
                <hr />
                <Link
                    href={route("home")}
                    className="block pt-2 text-gray-700 hover:text-blue-600 font-medium text-xl"
                >
                    যোগাযোগ
                </Link>
                <hr />
            </ul>
        </div>
    );
}

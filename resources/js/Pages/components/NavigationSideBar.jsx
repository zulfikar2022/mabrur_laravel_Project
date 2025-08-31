import { Link, usePage } from "@inertiajs/react";

export default function NavigationSideBar({ user }) {
    const { url } = usePage();
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
                    className={`${
                        url === "/"
                            ? "text-blue-600 underline"
                            : "text-gray-700"
                    } hover:text-blue-600  font-medium pb-2 text-xl`}
                >
                    হোম
                </Link>
                <hr />
                <Link
                    href={route("products.khejur")}
                    className={`hover:text-blue-600 font-medium pb-2 text-xl ${
                        url === "/products/specific/khejur"
                            ? "text-blue-600 underline"
                            : "text-gray-700 "
                    }`}
                >
                    খেজুর
                </Link>
                <hr />
                <Link
                    href={route("products.badam")}
                    className={`hover:text-blue-600 font-medium pb-2 text-xl ${
                        url === "/products/specific/badam"
                            ? "text-blue-600 underline"
                            : "text-gray-700 "
                    }`}
                >
                    বাদাম
                </Link>
                <hr />
                <Link
                    href={route("products.ghee")}
                    className={`hover:text-white text-black font-bold text-xl  ${
                        url === "/products/specific/ghee"
                            ? "text-white underline"
                            : "text-gray-700"
                    }`}
                >
                    ঘিl
                </Link>

                {!user || user?.isAdmin ? ( // TODO: have to invert the logic
                    <Link
                        href={route("my-order")}
                        className={`hover:text-blue-600 font-medium pb-2 text-xl  ${
                            url === "/my-order"
                                ? "text-blue-600 underline"
                                : "text-gray-700 "
                        }`}
                    >
                        আমার অর্ডার
                    </Link>
                ) : null}
                <hr />
                <Link
                    href={route("contact")}
                    className={`hover:text-blue-600 font-medium pb-2 text-xl  ${
                        url === "/contact"
                            ? "text-blue-600 underline"
                            : "text-gray-700 "
                    }`}
                >
                    যোগাযোগ
                </Link>
                <hr />
            </ul>
        </div>
    );
}

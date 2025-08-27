import { Head, Link } from "@inertiajs/react";
import Navbar from "./components/Navbar";
import { FaCartShopping } from "react-icons/fa6";
import Cart from "./components/Cart";
import { useState } from "react";
import AdminSideBar from "./components/AdminSideBar";

export default function MainLayout({ children, user, title }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const handleDrawerToggle = (e) => {
        const open = e.target.checked;
        setIsDrawerOpen(open);

        if (open) {
            const data = localStorage.getItem("mabrur_cart_items");
        }
    };
    return (
        <div className="min-h-screen min-w-full bg-gray-100 text-black">
            <Head>
                <title>{title}</title>
            </Head>
            <header className="sticky top-0 flex items-center justify-between bg-blue-600 text-white p-4 shadow-md z-40">
                {user && !user?.isAdmin ? ( //TODO: have to invert the logic
                    <div className="drawer-content z-0 ">
                        {/* Page content here */}
                        <label
                            htmlFor="my-drawer-4"
                            className="drawer-button  my-2 btn border-transparent bg-white text-blue-600"
                        >
                            অ্যাডমিন প্যানেল
                        </label>
                    </div>
                ) : (
                    <div className="drawer-content ">
                        <label
                            htmlFor="my-drawer-5"
                            className="drawer-button btn btn-primary bg-white text-blue-600 border-transparent"
                        >
                            <FaCartShopping />
                            <p> আপনার কার্ট</p>
                        </label>
                    </div>
                )}
                <div></div>
                <Navbar />
            </header>
            <main className="container mx-auto px-4 py-8 h-full min-h-[80vh]">
                {!user?.isAdmin && (
                    <div className="drawer drawer-end z-50">
                        {" "}
                        {/* TODO: have to invert the logic  */}
                        <input
                            id="my-drawer-4"
                            type="checkbox"
                            className="drawer-toggle"
                        />
                        <AdminSideBar />
                    </div>
                )}

                <div className="drawer drawer-end">
                    <input
                        onChange={handleDrawerToggle}
                        id="my-drawer-5"
                        type="checkbox"
                        className="drawer-toggle"
                    />
                    <div className="drawer-side z-50">
                        <label
                            htmlFor="my-drawer-5"
                            aria-label="close sidebar"
                            className="drawer-overlay"
                        ></label>
                        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 bg-blue-600">
                            <Cart isOpen={isDrawerOpen} />
                        </ul>
                    </div>
                </div>
                {children}
            </main>
            {/* make the footer at the bottom of the page and no margin after the page and it will be at bottom for all the pages. In some pages where less contents are there it is coming up.  */}

            <footer className="bg-gray-200 text-gray-700 p-4 mt-8 ">
                <p className="text-black text-center">
                    &copy; 2023 My E-commerce Site
                </p>
            </footer>
        </div>
    );
}

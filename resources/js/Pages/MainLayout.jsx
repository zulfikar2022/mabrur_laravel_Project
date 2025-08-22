import { Head, Link } from "@inertiajs/react";
import Navbar from "./components/Navbar";
import { FaCartShopping } from "react-icons/fa6";
import Cart from "./components/Cart";


export default function MainLayout({ children, user, title }) {
    return (
        <div className="min-h-screen min-w-full bg-gray-100 ">
            <Head>
                <title>{title}</title>
            </Head>
            <header>
                <Navbar />
            </header>
            <main className="container mx-auto px-4 py-8 h-full">
                {!user?.isAdmin && <div className="drawer drawer-end z-50">  {/* TODO: have to invert the logic  */}
                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-4" className="drawer-button text-white my-2 btn border-transparent bg-blue-600">অ্যাডমিন প্যানেল</label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay bg-red-50"></label>
                        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                            <li><Link href={route('products.create')}>প্রোডাক্ট যুক্ত করুন</Link></li>
                            <li><Link href={route('admin.products')}>সকল প্রোডাক্ট দেখুন</Link></li>
                        </ul>
                    </div>
                </div>}

                <div className="drawer drawer-end">
                    <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-5" className="drawer-button btn btn-primary bg-blue-600"><FaCartShopping />
                        </label>
                    </div>
                    <div className="drawer-side z-50">
                        <label htmlFor="my-drawer-5" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 bg-blue-600">
                            <Cart cartItems={JSON.parse(localStorage.getItem("mabrur_cart_items")) || []} />
                        </ul>
                    </div>
                </div>
                {children}
            </main>
            <footer>
                <p className="text-black text-center">&copy; 2023 My E-commerce Site</p>
            </footer>
        </div>
    );
}
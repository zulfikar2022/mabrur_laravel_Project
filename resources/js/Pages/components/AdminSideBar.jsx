import { Link } from "@inertiajs/react";

export default function AdminSideBar() {
    return (
        <div className="drawer-side">
            <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="drawer-overlay bg-red-50"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                <p className="font-bold text-lg mt-4">প্রোডাক্ট ম্যানেজমেন্ট</p>
                <li>
                    <Link href={route("products.create")}>
                        প্রোডাক্ট যুক্ত করুন
                    </Link>
                </li>
                <li>
                    <Link href={route("admin.products")}>
                        সকল প্রোডাক্ট দেখুন
                    </Link>
                </li>
                <p className="font-bold text-lg mt-4">অর্ডার ম্যানেজমেন্ট</p>
                <li>
                    <Link href={route("new-order")}>নতুন অর্ডারসমূহ</Link>
                </li>
                <li>
                    <Link href={route("confirmed-order")}>
                        কনফার্মড অর্ডারসমূহ
                    </Link>
                </li>
                <li>
                    <Link href={route("shipped-order")}>
                        কুরিয়ারকৃত অর্ডারসমূহ
                    </Link>
                </li>
                <li>
                    <Link href={route("paid-order")}>পেইড অর্ডারসমূহ</Link>
                </li>
                <li>
                    <Link href={route("deleted-order")}>
                        বাতিলকৃত অর্ডারসমূহ
                    </Link>
                </li>
                <li>
                    <Link href={route("all-order")}>সকল অর্ডার</Link>
                </li>
                <p className="font-bold text-lg mt-4">
                    কুরিয়ার চার্জ ম্যানেজমেন্ট
                </p>
                <li>
                    <Link href={route("show-delivery-charge")}>
                        ডেলিভারি চার্জ দেখুন
                    </Link>
                </li>
                <li>
                    <Link href={route("add-new-delivery-charge")}>
                        নতুন ডেলিভারি চার্জ যুক্ত করুন
                    </Link>
                </li>
            </ul>
        </div>
    );
}

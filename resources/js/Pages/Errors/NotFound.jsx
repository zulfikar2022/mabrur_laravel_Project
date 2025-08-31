import { Link } from "@inertiajs/react";
import MainLayout from "../MainLayout";

export default function NotFound({ user }) {
    return (
        <MainLayout user={user} title="404 Not Found">
            <div className="bg-red-500 p-6 rounded-lg shadow-md h-full text-white">
                <h1 className="text-3xl font-bold text-center my-10">
                    404 Not Found
                </h1>
                <p className="text-center">
                    আপনি যেই পৃষ্ঠাটি খুঁজছেন সেটি পাওয়া যায়নি।{" "}
                </p>
                <Link
                    href={route("home")}
                    className="text-white hover:underline text-center block mt-4 underline font-semibold"
                >
                    হোম পৃষ্ঠায় ফিরে যান
                </Link>
            </div>
        </MainLayout>
    );
}

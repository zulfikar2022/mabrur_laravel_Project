import { Link } from "@inertiajs/react";
import MainLayout from "../MainLayout";

export default function ShowDeliveryCharge({ user, deliveryCharge }) {
    return (
        <MainLayout user={user} title="Current Delivery Charge">
            <h2 className="text-center text-2xl mb-4 ">
                বর্তমান ডেলিভারি চার্জ
            </h2>
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
                <div className="flex justify-between">
                    <p>ঢাকায় ১ গ্রাম থেকে ১৫০ গ্রাম পর্যন্ত চার্জ: </p>
                    <p>{deliveryCharge?.dhaka_one_gram_to_150_gram} টাকা</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <p>ঢাকায় ১৫১ গ্রাম থেকে ৫০০ গ্রাম পর্যন্ত চার্জ: </p>
                    <p>{deliveryCharge?.dhaka_151_gram_to_500_gram} টাকা</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <p>ঢাকায় প্রথম কেজিতে চার্জ: </p>
                    <p>{deliveryCharge?.dhaka_first_kg} টাকা</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <p>ঢাকায় পরবর্তী প্রতি কেজিতে চার্জ: </p>
                    <p>{deliveryCharge?.dhaka_additional_kgs} টাকা</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <p>ঢাকার বাইরে প্রথম কেজিতে চার্জ: </p>
                    <p>{deliveryCharge?.outside_dhaka_first_kg} টাকা</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <p>ঢাকার বাইরে পরবর্তী প্রতি কেজিতে চার্জ: </p>
                    <p>{deliveryCharge?.outside_dhaka_additional_kgs} টাকা</p>
                </div>

                <Link
                    href={route("add-new-delivery-charge")}
                    className="text-center text-blue-600 hover:underline cursor-pointer mt-2 block"
                >
                    নতুন ডেলিভারি চার্জ যুক্ত করুন
                </Link>
            </div>
        </MainLayout>
    );
}

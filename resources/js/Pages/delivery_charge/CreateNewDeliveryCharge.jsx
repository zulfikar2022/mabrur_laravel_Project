import { Link, useForm } from "@inertiajs/react";
import MainLayout from "../MainLayout";
import { parse } from "postcss";
import Swal from "sweetalert2";

export default function CreateNewDeliveryCharge({ user }) {
    const { data, setData, post, processing, reset } = useForm({
        dhaka_one_gram_to_150_gram: 1,
        dhaka_151_gram_to_500_gram: 1,
        dhaka_first_kg: 1,
        dhaka_additional_kgs: 1,
        outside_dhaka_first_kg: 1,
        outside_dhaka_additional_kgs: 1,
    });
    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            data.dhaka_first_kg <= 0 ||
            data.dhaka_additional_kgs <= 0 ||
            data.outside_dhaka_first_kg <= 0 ||
            data.outside_dhaka_additional_kgs <= 0
        ) {
            Swal.fire({
                icon: "error",
                title: "ত্রুটি",
                text: "অনুগ্রহ করে সব ফিল্ডে ধনাত্মক সংখ্যা প্রদান করুন।",
            });
            return;
        }

        post(route("save-delivery-charge"), {
            preserveScroll: true,
            onSuccess: () => {
                window.location.href = route("show-delivery-charge");
            },
        });
    };
    return (
        <MainLayout user={user} title="Create New Delivery Charge">
            <h2 className="text-center text-2xl mb-4 ">
                নতুন ডেলিভারি চার্জ যুক্ত করুন
            </h2>

            <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
            >
                <div className="mb-4">
                    <label
                        htmlFor="dhaka_one_gram_to_150_gram"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        ঢাকায় ১ গ্রাম থেকে ১৫০ গ্রাম পর্যন্ত চার্জ (টাকা):
                    </label>
                    <input
                        onChange={(e) =>
                            setData(
                                "dhaka_one_gram_to_150_gram",
                                parseInt(e.target.value)
                            )
                        }
                        required
                        type="number"
                        id="dhaka_one_gram_to_150_gram"
                        name="dhaka_one_gram_to_150_gram"
                        min={1}
                        step={1}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="ঢাকায় ১ গ্রাম থেকে ১৫০ গ্রাম পর্যন্ত চার্জ (টাকা)"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="dhaka_151_gram_to_500_gram"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        ঢাকায় ১৫১ গ্রাম থেকে ৫০০ গ্রাম পর্যন্ত চার্জ (টাকা):
                    </label>
                    <input
                        required
                        onChange={(e) =>
                            setData(
                                "dhaka_151_gram_to_500_gram",
                                parseInt(e.target.value)
                            )
                        }
                        type="number"
                        id="dhaka_151_gram_to_500_gram"
                        name="dhaka_151_gram_to_500_gram"
                        min={1}
                        step={1}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="ঢাকায় ১৫১ গ্রাম থেকে ৫০০ গ্রাম পর্যন্ত চার্জ (টাকা)"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="amount"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        ঢাকায় প্রথম কেজিতে চার্জ (টাকা):
                    </label>
                    <input
                        required
                        onChange={(e) =>
                            setData("dhaka_first_kg", parseInt(e.target.value))
                        }
                        type="number"
                        id="dhaka_first_kg"
                        name="dhaka_first_kg"
                        min={1}
                        step={1}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="ঢাকায় প্রথম কেজিতে চার্জ (টাকা)"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="amount"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        ঢাকায় পরবর্তী প্রতি কেজিতে চার্জ (টাকা):
                    </label>
                    <input
                        onChange={(e) =>
                            setData(
                                "dhaka_additional_kgs",
                                parseInt(e.target.value)
                            )
                        }
                        required
                        type="number"
                        id="dhaka_additional_kgs"
                        name="dhaka_additional_kgs"
                        min={1}
                        step={1}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="ঢাকায় পরবর্তী প্রতি কেজিতে চার্জ (টাকা)"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="amount"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        ঢাকার বাইরে প্রথম কেজিতে চার্জ (টাকা):
                    </label>
                    <input
                        onChange={(e) =>
                            setData(
                                "outside_dhaka_first_kg",
                                parseInt(e.target.value)
                            )
                        }
                        required
                        type="number"
                        id="outside_dhaka_first_kg"
                        name="outside_dhaka_first_kg"
                        min={1}
                        step={1}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="ঢাকার বাইরে প্রথম কেজিতে চার্জ (টাকা):"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="amount"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        ঢাকার বাইরে পরবর্তী প্রতি কেজিতে চার্জ (টাকা):
                    </label>
                    <input
                        onChange={(e) =>
                            setData(
                                "outside_dhaka_additional_kgs",
                                parseInt(e.target.value)
                            )
                        }
                        required
                        type="number"
                        id="outside_dhaka_additional_kgs"
                        name="outside_dhaka_additional_kgs"
                        min={1}
                        step={1}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="ঢাকার বাইরে পরবর্তী প্রতি কেজিতে চার্জ (টাকা):"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    সংরক্ষণ করুন
                </button>

                <Link
                    href={route("show-delivery-charge")}
                    className="text-center text-blue-600 hover:underline cursor-pointer mt-4 block"
                >
                    বর্তমান ডেলিভারি চার্জ দেখুন
                </Link>
            </form>
        </MainLayout>
    );
}

import { useForm } from "@inertiajs/react";
import MainLayout from "./MainLayout";
import { useState } from "react";

export default function AddNewCourier({ user }) {
    const { post, setData } = useForm({ name: "" });

    return (
        <MainLayout user={user} title={"Add New Courier"}>
            <div className=" p-6 bg-white rounded shadow-md w-full md:w-1/2 mx-auto">
                <h2 className="text-center text-2xl my-2 font-bold">
                    নতুন কুরিয়ার যুক্ত করুন
                </h2>
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        post(route("admin.couriers.store"), {
                            preserveScroll: true,
                            forceFormData: true,
                            onSuccess: () => {
                                // Handle success
                            },
                        });
                    }}
                >
                    {/* <form> */}
                    <div className="mb-4">
                        <label
                            htmlFor="courierName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            কুরিয়ারের নাম
                        </label>
                        <input
                            type="text"
                            id="courierName"
                            name="name"
                            placeholder="কুরিয়ারের নাম লিখুন"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        যুক্ত করুন
                    </button>
                </form>
            </div>
        </MainLayout>
    );
}

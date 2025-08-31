import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function SearchOrder() {
    const [orderId, setOrderId] = useState("");
    const [customerDetails, setCustomerDetails] = useState("");
    const { get } = useForm();

    const handleSearch = async () => {
        // Implement search logic here
        console.log("Searching for:", { orderId, customerDetails });
        get(
            route("all-order", {
                id: orderId,
                customer_details: customerDetails,
            }),
            {
                onSuccess: (data) => {
                    console.log(data);
                    console.log("data successfully received");
                },

                onError: () => {
                    console.log("Error occured");
                },
            }
        );
    };

    const handleViewAll = () => {
        console.log("Viewing all orders");
        get(route("all-order"));
    };

    return (
        <div>
            <h2 className="text-center text-2xl mb-2">অর্ডার অনুসন্ধান করুন</h2>
            <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-center mb-4">
                <input
                    type="text"
                    placeholder="অর্ডার আইডি"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="border p-2 mr-2 rounded"
                />
                <input
                    type="text"
                    placeholder="গ্রাহকের বিবরণ"
                    value={customerDetails}
                    onChange={(e) => setCustomerDetails(e.target.value)}
                    className="border p-2 mr-2 rounded"
                />

                <div className="flex flex-col md:flex-row gap-3 md:gap-0 space-x-2">
                    <button
                        onClick={handleSearch}
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        অনুসন্ধান করুন
                    </button>
                    <button
                        onClick={handleViewAll}
                        className="bg-gray-500 text-white p-2 rounded"
                    >
                        সকল অর্ডার দেখুন
                    </button>
                </div>
            </div>
        </div>
    );
}

import { useForm } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";
import AdminProductCard from "./AdminProductCard";

const Tabs = ({ products }) => {
    const [activeTab, setActiveTab] = useState("all");

    const tabs = [
        { id: "all", label: "সকল প্রোডাক্ট" },
        { id: "dates", label: "খেজুর" },
        { id: "nuts", label: "বাদাম" },
    ];

    return (
        <div className="w-full  mx-auto">
            {/* Tab Buttons */}
            <div className="flex border-b border-gray-300">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 -mb-px font-medium border-b-2 transition-colors ${
                            activeTab === tab.id
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-600"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="p-6 bg-gray-100 mt-4 rounded-md">
                {activeTab === "all" && (
                    <div className="text-black">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <AdminProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))
                            ) : (
                                <div className="text-red-600">
                                    <p className="text-center">
                                        কোনো পণ্য পাওয়া যায়নি।
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {activeTab === "dates" && (
                    <div className="text-black">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {products.filter(
                                (product) => product.category === "date"
                            ).length > 0 ? (
                                products
                                    .filter(
                                        (product) => product.category === "date"
                                    )
                                    .map((product) => (
                                        <AdminProductCard
                                            key={product.id}
                                            product={product}
                                        />
                                    ))
                            ) : (
                                <p className="text-center text-red-600">
                                    কোনো খেজুর পাওয়া যায়নি।
                                </p>
                            )}
                        </div>
                    </div>
                )}
                {activeTab === "nuts" && (
                    <div className="text-black">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {products.filter(
                                (product) => product.category === "nut"
                            ).length > 0 ? (
                                products
                                    .filter(
                                        (product) => product.category === "nut"
                                    )
                                    .map((product) => (
                                        <AdminProductCard
                                            key={product.id}
                                            product={product}
                                        />
                                    ))
                            ) : (
                                <p className="text-center text-red-600">
                                    কোনো বাদাম পাওয়া যায়নি।
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tabs;

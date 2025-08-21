import { useForm } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";

const Tabs = ({ products }) => {
    const [activeTab, setActiveTab] = useState("all");
    const { delete: destroy } = useForm();

    const handleDeleteProduct = (productItself) => {
        Swal.fire({
            title: "আপনি কি আসলেই পণ্যটি ডিলিট করতে চাচ্ছেন?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "হ্যাঁ, ডিলিট করুন"
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("products.destroy", productItself), {
                    preserveScroll: true,
                    onSuccess: () => {
                        Swal.fire({
                            text: "পণ্যটি সফলভাবে ডিলিট করা হয়েছে।",
                            icon: "success"
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            text: "পণ্যটি ডিলিট করতে ব্যর্থ হয়েছে।",
                            icon: "error"
                        });
                    }
                });
            }
        });
    }

    {

        /*
         <div className="flex flex-row justify-between  w-full mt-3">
                                        <p className="text-white bg-green-500 px-3 py-1 rounded">Update</p>
                                        <p onClick={() => handleDeleteProduct(product)} className="text-white bg-red-500 px-3 py-1 rounded hover:cursor-pointer">Delete</p>
                                    </div>

                                       src={`http://127.0.0.1:8000/storage/${product.image_path}`}
        */
    }

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
                        className={`px-4 py-2 -mb-px font-medium border-b-2 transition-colors ${activeTab === tab.id
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
                {activeTab === "all" && <div className="text-black">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {
                            products.length > 0 ? products.map(product =>
                                <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                                    <img src={`http://127.0.0.1:8000/storage/${product.image_path}`} alt={product.name} className="h-32 w-full object-cover rounded" />
                                    <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                                    <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                                    <span className="text-blue-600 font-bold">৳ {product.price_per_kg}/কেজি</span>
                                    <div className="flex flex-row justify-between  w-full mt-3">
                                        <p className="text-white bg-green-500 px-3 py-1 rounded">Update</p>
                                        <p onClick={() => handleDeleteProduct(product)} className="text-white bg-red-500 px-3 py-1 rounded hover:cursor-pointer">Delete</p>
                                    </div>
                                </div>) : <div className="text-red-600">
                                <p className="text-center">কোনো পণ্য পাওয়া যায়নি।</p>
                            </div>
                        }
                    </div>
                </div>}
                {activeTab === "dates" && <div className="text-black">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {
                            products.filter(product => product.category === 'date').length > 0 ? (
                                products.filter(product => product.category === 'date').map(product => (
                                    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                                        <img src={`http://127.0.0.1:8000/storage/${product.image_path}`} alt={product.name} className="h-32 w-full object-cover rounded" />
                                        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                                        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                                        <span className="text-blue-600 font-bold">৳ {product.price_per_kg}/কেজি</span>
                                        <div className="flex flex-row justify-between  w-full mt-3">
                                            <p className="text-white bg-green-500 px-3 py-1 rounded">Update</p>
                                            <p onClick={() => handleDeleteProduct(product)} className="text-white bg-red-500 px-3 py-1 rounded hover:cursor-pointer">Delete</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-red-600">কোনো খেজুর পাওয়া যায়নি।</p>
                            )
                        }
                    </div>
                </div>}
                {activeTab === "nuts" && <div className="text-black">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {
                            products.filter(product => product.category === 'nut').length > 0 ? (
                                products.filter(product => product.category === 'nut').map(product => (
                                    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                                        <img src={`http://127.0.0.1:8000/storage/${product.image_path}`} alt={product.name} className="h-32 w-full object-cover rounded" />
                                        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                                        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                                        <span className="text-blue-600 font-bold">৳ {product.price_per_kg}/কেজি</span>
                                        <div className="flex flex-row justify-between  w-full mt-3">
                                            <p className="text-white bg-green-500 px-3 py-1 rounded">Update</p>
                                            <p onClick={() => handleDeleteProduct(product)} className="text-white bg-red-500 px-3 py-1 rounded hover:cursor-pointer">Delete</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-red-600">কোনো বাদাম পাওয়া যায়নি।</p>
                            )
                        }
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default Tabs;

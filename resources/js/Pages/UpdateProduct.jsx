import { useForm } from "@inertiajs/react";
import MainLayout from "./MainLayout";
import { useState } from "react";
import Swal from "sweetalert2";

export default function UpdateProduct({ user, product, success }) {
    const form = useForm({
        category: product.category,
        name: product.name,
        description: product.description,
        price_per_kg: product.price_per_kg,
        total_kg: product.total_available_in_kg,
    });

    const { data, setData, processing, put } = form;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        put(route("products.update", product.id), {
            onSuccess: () => {
                window.location.href = route("admin.products");
            },
        });
    };
    return (
        <>
            <MainLayout user={user} title={"প্রোডাক্ট আপডেট করুন"}>
                <div className="max-w-md sm:mx-5 md:mx-auto mt-10 p-6 shadow-lg rounded-lg bg-white text-black mb-10">
                    <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
                        প্রোডাক্ট আপডেট করুন
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* ক্যাটাগরি ড্রপডাউন */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-blue-600">
                                    প্রোডাক্টের ধরন
                                </span>
                            </label>
                            <select
                                className="rounded input-bordered w-full border-gray-300 text-black"
                                value={data.category}
                                onChange={(e) =>
                                    setData("category", e.target.value)
                                }
                            >
                                <option value="date">খেজুর</option>
                                <option value="nut">বাদাম</option>
                                <option value="mango">আম</option>
                                <option value="ghee">ঘি</option>
                                <option value="honey">মধু</option>
                            </select>
                        </div>

                        {/* নাম */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-blue-600">
                                    নাম
                                </span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="আপনার প্রোডাক্টের নাম লিখুন"
                                className="rounded input-bordered w-full border-gray-300 text-black"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />
                        </div>

                        {/* বিস্তারিত */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-blue-600">
                                    হালকা বিস্তারিত
                                </span>
                            </label>
                            <textarea
                                placeholder="হালকা বিস্তারিত লিখুন"
                                value={data.description}
                                className="rounded textarea-bordered w-full border-gray-300 text-black"
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                            />
                        </div>

                        {/* প্রতি কেজির মূল্য */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-blue-600">
                                    প্রতি কেজির মূল্য
                                </span>
                            </label>
                            <input
                                type="number"
                                step="1"
                                min="1"
                                placeholder="প্রতি কেজির মূল্য লিখুন"
                                value={data.price_per_kg}
                                className="rounded input-bordered w-full border-gray-300 text-black"
                                onChange={(e) =>
                                    setData("price_per_kg", e.target.value)
                                }
                                required
                            />
                        </div>

                        {/* মোট পরিমাণ (কেজি) */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-blue-600">
                                    মোট পরিমাণ (কেজি)
                                </span>
                            </label>
                            <input
                                type="number"
                                step="1"
                                min="1"
                                value={data.total_kg}
                                placeholder="মোট পরিমাণ (কেজি) লিখুন"
                                className="rounded input-bordered w-full border-gray-300 text-black"
                                onChange={(e) =>
                                    setData("total_kg", e.target.value)
                                }
                                required
                            />
                        </div>

                        <div>
                            <p className="text-blue-600">বর্তমান ছবি</p>
                            <img
                                src={`http://localhost:8000/storage/${product.image_path}`}
                                alt="Current Product"
                                className="w-full h-64 object-cover rounded-lg border border-gray-200"
                            />
                        </div>

                        <button
                            disabled={processing}
                            type="submit"
                            className="btn bg-blue-600 border-none w-full"
                        >
                            সংরক্ষণ করুন
                        </button>
                    </form>
                </div>
            </MainLayout>
        </>
    );
}

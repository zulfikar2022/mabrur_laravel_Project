import { useForm } from "@inertiajs/react";
import { useState } from "react";
import MainLayout from "./MainLayout";

const AddProduct = ({ user }) => {
    const { data, setData, post, processing, reset } = useForm({
        category: "date",
        name: "",
        description: "",
        price_per_kg: "",
        total_kg: "",
        // image: null,
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setData("image", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (data.name === "" || data.price_per_kg <= 0 || data.total_kg <= 0) {
            alert("অনুগ্রহ করে সব ফিল্ড সঠিকভাবে পূরণ করুন।");
            return;
        }

        post(route("products.store"), {
            preserveScroll: true,
            forceFormData: true, // <-- this makes Inertia use FormData for file upload
            onSuccess: () => {
                window.location.reload();
            },
        });
    };

    return (
        <MainLayout user={user} title="প্রোডাক্ট যুক্ত করুন">
            <div className="max-w-md sm:mx-5 md:mx-auto mt-10 p-6 shadow-lg rounded-lg bg-white text-black mb-10">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    প্রোডাক্ট যুক্ত করুন
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Category Dropdown */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-black">
                                প্রোডাক্টের ধরন
                            </span>
                        </label>
                        <select
                            className="rounded input-bordered w-full border-gray-300 text-black"
                            onChange={(e) =>
                                setData("category", e.target.value)
                            }
                        >
                            <option value="date">খেজুর</option>
                            <option value="nut">বাদাম</option>
                            <option value="mango">আম</option>
                            <option value="ghee">ঘি</option>
                        </select>
                    </div>

                    {/* Name */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-blue-500">
                                নাম
                            </span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="আপনার প্রোডাক্টের নাম দিন"
                            className="rounded input-bordered w-full border-gray-300 text-black"
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-blue-500">
                                হালকা বিস্তারিত
                            </span>
                        </label>
                        <textarea
                            placeholder="হালকা বিস্তারিত দিন"
                            className="rounded textarea-bordered w-full border-gray-300 text-black"
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />
                    </div>

                    {/* Price Per Kg */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-blue-500">
                                প্রতি কেজির মূল্য
                            </span>
                        </label>
                        <input
                            type="number"
                            step="1.0"
                            min="1"
                            placeholder="প্রতি কেজির মূল্য"
                            className="rounded input-bordered w-full border-gray-300 text-black"
                            onChange={(e) =>
                                setData("price_per_kg", e.target.value)
                            }
                            required
                        />
                    </div>

                    {/* Total Available in Kg */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-blue-500">
                                প্রোডাক্টের মোট পরিমাণ
                            </span>
                        </label>
                        <input
                            type="number"
                            step="1.0"
                            min="1"
                            placeholder="প্রোডাক্টের মোট পরিমাণ কেজিতে দিন"
                            className="rounded input-bordered w-full border-gray-300 text-black"
                            onChange={(e) =>
                                setData("total_kg", e.target.value)
                            }
                            required
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-blue-500">
                                ছবি
                            </span>
                        </label>
                        {!preview ? (
                            <input
                                type="file"
                                accept="image/*"
                                className="border rounded file-input-bordered w-full border-gray-300 text-black"
                                onChange={handleImageChange}
                                name="image"
                            />
                        ) : (
                            <div className="relative">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-64 object-cover rounded-lg border border-gray-200"
                                />
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="btn bg-blue-600 border-none w-full"
                    >
                        সংরক্ষণ করুন
                    </button>
                </form>
            </div>
        </MainLayout>
    );
};

export default AddProduct;

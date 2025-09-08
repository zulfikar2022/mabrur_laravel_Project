import { useForm } from "@inertiajs/react";
import { useState } from "react";
import MainLayout from "./MainLayout";
import FreeDelivery from "@/Components/FreeDelivery";
import CourierSelect from "./components/CourierSelect";
import SelectProductCategory from "./components/SelectProductCategory";
import ProductEntryTextField from "./components/product_entry_input_fields/ProductEntryTextField";
import ProductEntryNumberField from "./components/product_entry_input_fields/ProductEntryNumberField";

const AddProduct = ({ user, couriers }) => {
    const { data, setData, post, processing, reset } = useForm({
        category: "date",
        name: "",
        description: "",
        price_per_kg: "",
        total_kg: "",
        // image: null,
        is_delivery_charge_free: false,
        minimum_weight_for_free_delivery: 0,
        courier_id: 1,
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

        console.log(data);
        // return;

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
                    <SelectProductCategory setData={setData} />

                    {/* Name */}
                    <ProductEntryTextField
                        label="নাম"
                        type="text"
                        name="name"
                        placeholder="আপনার প্রোডাক্টের নাম দিন"
                        setData={setData}
                        data={data}
                    />

                    {/* Description */}

                    <ProductEntryTextField
                        label="বিস্তারিত"
                        type="text"
                        name="description"
                        placeholder="বিস্তারিত দিন"
                        setData={setData}
                    />
                    <FreeDelivery setData={setData} data={data} />
                    <CourierSelect couriers={couriers} setData={setData} />

                    {/* Price Per Kg */}

                    <ProductEntryNumberField
                        label="প্রতি কেজির মূল্য"
                        name="price_per_kg"
                        type="number"
                        step="1.0"
                        min="1"
                        placeholder="প্রতি কেজির মূল্য"
                        setData={setData}
                        required={true}
                        data={data}
                    />

                    {/* Total Available in Kg */}
                    <ProductEntryNumberField
                        label="প্রোডাক্টের মোট পরিমাণ (কেজিতে)"
                        name="total_kg"
                        type="number"
                        step="1.0"
                        min="1"
                        placeholder="প্রোডাক্টের মোট পরিমাণ কেজিতে দিন"
                        setData={setData}
                        required={true}
                        data={data}
                    />

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

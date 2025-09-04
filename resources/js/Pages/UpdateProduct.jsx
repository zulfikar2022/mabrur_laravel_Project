import { useForm } from "@inertiajs/react";
import MainLayout from "./MainLayout";
import { useState } from "react";
import Swal from "sweetalert2";
import SelectProductCategoryForUpdate from "./components/product_update_component/SelectProductCategoryForUpdate";
import ProductEntryTextField from "./components/product_entry_input_fields/ProductEntryTextField";
import ProductEntryNumberField from "./components/product_entry_input_fields/ProductEntryNumberField";
import FreeDelivery from "@/Components/FreeDelivery";
import CourierSelect from "./components/CourierSelect";

export default function UpdateProduct({ user, product, success, couriers }) {
    const form = useForm({
        category: product.category,
        name: product.name,
        description: product.description,
        price_per_kg: product.price_per_kg,
        total_kg: product.total_available_in_kg,
        is_delivery_charge_free: product.is_delivery_charge_free,
        minimum_weight_for_free_delivery:
            product.minimum_weight_for_free_delivery,
        courier_id: product.courier_id || 1,
    });

    const { data, setData, processing, put } = form;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        return;
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
                        <SelectProductCategoryForUpdate
                            category={data.category}
                            setData={setData}
                        />

                        {/* নাম */}
                        <ProductEntryTextField
                            label="নাম"
                            type="text"
                            name="name"
                            placeholder="আপনার প্রোডাক্টের নাম লিখুন"
                            setData={setData}
                            required={true}
                            value={data.name}
                        />

                        {/* বিস্তারিত */}
                        <ProductEntryTextField
                            label="হালকা বিস্তারিত"
                            type="text"
                            name="description"
                            placeholder="হালকা বিস্তারিত লিখুন"
                            setData={setData}
                            required={false}
                            value={data.description}
                        />

                        <FreeDelivery
                            setData={setData}
                            yesSelectedProp={data.is_delivery_charge_free}
                        />
                        {/* কুরিয়ার সার্ভিস */}
                        <CourierSelect
                            couriers={couriers}
                            setData={setData}
                            courierId={data.courier_id || 1}
                        />
                        {/* প্রতি কেজির মূল্য */}
                        <ProductEntryNumberField
                            label="প্রতি কেজির মূল্য"
                            type="number"
                            name="price_per_kg"
                            step="1"
                            min="1"
                            placeholder="প্রতি কেজির মূল্য লিখুন"
                            setData={setData}
                            required={true}
                            value={data.price_per_kg}
                        />

                        {/* মোট পরিমাণ (কেজি) */}
                        <ProductEntryNumberField
                            label="মোট পরিমাণ (কেজি)"
                            type="number"
                            name="total_kg"
                            step="0.01"
                            min="0.01"
                            placeholder="মোট পরিমাণ (কেজি) লিখুন"
                            setData={setData}
                            required={true}
                            value={data.total_kg}
                        />

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

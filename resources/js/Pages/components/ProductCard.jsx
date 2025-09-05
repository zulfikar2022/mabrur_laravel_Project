import { useState } from "react";
import { BsCart4 } from "react-icons/bs";
import Swal from "sweetalert2";

export default function ProductCard({ product, isCarted, setRender }) {
    const addToCart = () => {
        const cartItemsFromLocalStorage =
            localStorage.getItem("mabrur_cart_items");
        const cartItems = cartItemsFromLocalStorage
            ? JSON.parse(cartItemsFromLocalStorage)
            : [];

        if (!cartItems.some((item) => item.id === product.id)) {
            cartItems.push({
                id: product.id,
                name: product.name,
                image_path: product.image_path,
                quantity_kg: 1,
                quantity_gram: 0,
            });
        }
        localStorage.setItem("mabrur_cart_items", JSON.stringify(cartItems));

        Swal.fire({
            title: "কার্টে যুক্ত করা হয়েছে",
            text: `${product.name} কার্টে যুক্ত করা হয়েছে।`,
            icon: "success",
            confirmButtonText: "ঠিক আছে",
        });
        setRender((prev) => !prev);
    };

    return (
        <>
            <div
                className={`bg-white rounded-lg shadow p-4 flex flex-col items-center justify-between ${
                    product?.is_delivery_charge_free
                        ? "p-6 rounded-2xl border-4 border-green-700 shadow-lg shadow-green-300 animate-none"
                        : ""
                }`}
            >
                <img
                    src={`http://127.0.0.1:8000/storage/${product.image_path}`}
                    alt={product.name}
                    className="h-32 w-full object-cover rounded"
                />
                <h3 className="text-lg font-semibold mb-1 text-black">
                    {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                    {product.description}
                </p>
                <div className="flex flex-row items-center space-x-2">
                    <span className="text-blue-600 font-bold">
                        ৳ {product.price_per_kg}/কেজি
                    </span>
                </div>
                <p
                    onClick={addToCart}
                    className={`
                    mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-500 ease-in-out hover:cursor-pointer`}
                >
                    {" "}
                    <BsCart4 className="inline" />{" "}
                    <span>কার্টে যুক্ত করুন</span>
                </p>
                {product.is_delivery_charge_free ? (
                    <>
                        <p className="text-green-600 font-bold">
                            ফ্রি ডেলিভারি
                        </p>
                        <p className="text-gray-600 text-sm">
                            মিনিমাম ওজন:{" "}
                            {product.minimum_weight_for_free_delivery} কেজি
                        </p>
                    </>
                ) : (
                    <div></div>
                )}
            </div>
        </>
    );
}

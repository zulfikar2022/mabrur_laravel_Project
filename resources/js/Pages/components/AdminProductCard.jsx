import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function AdminProductCard({ product }) {
    const { delete: destroy, get } = useForm();

    const handleEditProduct = (productId) => {
        get(route("products.edit", productId));
    };

    const handleDeleteProduct = () => {
        Swal.fire({
            title: "আপনি কি আসলেই পণ্যটি ডিলিট করতে চাচ্ছেন?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "হ্যাঁ, ডিলিট করুন",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("products.destroy", product), {
                    preserveScroll: true,
                    onSuccess: () => {
                        Swal.fire({
                            text: "পণ্যটি সফলভাবে ডিলিট করা হয়েছে।",
                            icon: "success",
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            text: "পণ্যটি ডিলিট করতে ব্যর্থ হয়েছে।",
                            icon: "error",
                        });
                    },
                });
            }
        });
    };
    const handleProductStockOut = (event) => {
        event.preventDefault();
        Swal.fire({
            title: product.is_available
                ? "আপনি কি আসলেই পণ্যটিকে স্টক আউট করতে চাচ্ছেন?"
                : "আপনি কি আসলেই পণ্যটিকে স্টকে আনতে চাচ্ছেন?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: product.is_available
                ? "হ্যাঁ, স্টক আউট করুন"
                : "হ্যাঁ, স্টকে আনুন",
        }).then((result) => {
            if (result.isConfirmed) {
                get(
                    route("admin.products.change-availability", {
                        id: product.id,
                    }),
                    {
                        preserveScroll: true,
                        onSuccess: () => {
                            // window.location.reload();
                            Swal.fire({
                                text: "পণ্যটির স্টক অবস্থা সফলভাবে পরিবর্তন করা হয়েছে।",
                                icon: "success",
                            });
                        },
                        onError: () => {
                            Swal.fire({
                                text: "পণ্যটি স্টক আউট করতে ব্যর্থ হয়েছে।",
                                icon: "error",
                            });
                        },
                    }
                );
            }
        });
    };
    return (
        <div
            key={product.id}
            className={`bg-white rounded-lg shadow p-4 flex flex-col items-center ${
                product.is_available ? "" : "opacity-25"
            }`}
        >
            <img
                src={`http://127.0.0.1:8000/storage/${product.image_path}`}
                alt={product.name}
                className="h-32 w-full object-cover rounded"
            />
            <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
            <span className="text-blue-600 font-bold">
                ৳ {product.price_per_kg}/কেজি
            </span>
            <div className="flex flex-row justify-between  w-full mt-3">
                <p
                    onClick={() => handleEditProduct(product.id)}
                    className="text-white bg-green-500 px-3 py-1 rounded hover:cursor-pointer"
                >
                    Update
                </p>
                <p
                    onClick={() => handleDeleteProduct()}
                    className="text-white bg-red-500 px-3 py-1 rounded hover:cursor-pointer"
                >
                    Delete
                </p>
                <div onClick={handleProductStockOut}>
                    {product.is_available ? (
                        <p className="text-white bg-red-500 font-bold px-3 py-1 rounded hover:cursor-pointer">
                            Stock -
                        </p>
                    ) : (
                        <p className="text-white bg-blue-500 font-bold px-3 py-1 rounded hover:cursor-pointer bg-opacity-100">
                            Stock +
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

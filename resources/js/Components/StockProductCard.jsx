import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function StockProductCard({ product }) {
    const { get } = useForm();
    console.log(get);
    //admin.products.change-availability

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
        <div className="border p-4 rounded-lg shadow-md flex flex-row  items-center mb-4">
            <img
                src={`http://localhost:8000/storage/${product.image_path}`}
                alt="Current Product"
                className="w-32 h-32 object-cover rounded-lg border border-gray-200"
            />
            <div className="ml-4">
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <button
                    onClick={handleProductStockOut}
                    className={`btn ${
                        product.is_available ? "bg-red-700" : "bg-blue-600"
                    } border-none text-white `}
                >
                    {product.is_available ? "স্টক আউট করুন" : "স্টকে আনুন"}
                </button>
            </div>
        </div>
    );
}

import { BsCart4 } from "react-icons/bs";
import Swal from "sweetalert2";

export default function ProductCard({ product }) {

    const addToCart = () => {

        const cartItemsFromLocalStorage = localStorage.getItem("mabrur_cart_items");
        const cartItems = cartItemsFromLocalStorage ? JSON.parse(cartItemsFromLocalStorage) : [];

        if (!cartItems.some(item => item.id === product.id)) {
            cartItems.push({ id: product.id, name: product.name, image_path: product.image_path });
        }
        localStorage.setItem("mabrur_cart_items", JSON.stringify(cartItems));

        Swal.fire({
            title: "পণ্যটি কার্টে যুক্ত হয়েছে",
            text: "আপনি কার্টে গিয়ে পণ্যটি দেখতে পারেন।",
            icon: "success",
            confirmButtonText: "ঠিক আছে",
            customClass: {
                confirmButton: "bg-blue-600 text-white hover:bg-blue-700 transition duration-500 ease-in-out"
            }
        });

        // document.getElementById("my-drawer-5").checked = true;
    }

    return (<>
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
            <img src={`http://127.0.0.1:8000/storage/${product.image_path}`} alt={product.name} className="h-32 w-full object-cover rounded" />
            <h3 className="text-lg font-semibold mb-1 text-black">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
            <span className="text-blue-600 font-bold">৳ {product.price_per_kg}/কেজি</span>
            <p
                onClick={addToCart}
                className="
                    mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-500 ease-in-out hover:cursor-pointer"> <BsCart4 className="inline" /> <span>কার্টে যুক্ত করুন</span></p>
        </div>
    </>);
}





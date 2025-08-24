import { useState } from "react";
import ProductCard from "./components/ProductCard";
import MainLayout from "./MainLayout";

export default function Welcome({ products, name, user }) {
    const cartItemsFromLocalStorage = localStorage.getItem("mabrur_cart_items");
    const [render, setRender] = useState(false);

    return (
        <>
            <MainLayout title="Welcome" user={user}>
                <div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {products.map((product) => {
                            const isCarted = cartItemsFromLocalStorage
                                ? JSON.parse(cartItemsFromLocalStorage).some(
                                      (item) => item.id === product.id
                                  )
                                : false;

                            return (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    isCarted={isCarted}
                                    setRender={setRender}
                                />
                            );
                        })}
                    </div>
                </div>
            </MainLayout>
        </>
    );
}

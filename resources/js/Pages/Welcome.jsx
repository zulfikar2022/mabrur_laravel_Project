import { useState } from "react";
import ProductCard from "./components/ProductCard";
import MainLayout from "./MainLayout";
import { Head } from "@inertiajs/react";

export default function Welcome({ products, name, user }) {
    const cartItemsFromLocalStorage = localStorage.getItem("mabrur_cart_items");
    const [render, setRender] = useState(false);

    return (
        <>
            <MainLayout title="মাবরুর ন্যাচারাল হাউজ" user={user}>
                <Head>
                    <meta
                        name="description"
                        content="Discover premium quality dates, nuts, honey, and ghee at Mabrur Natural House. Fresh, organic, and delivered to your doorstep."
                    />
                    <meta
                        name="keywords"
                        content="buy dates online, buy nuts, honey online, pure ghee, organic food, Mabrur Natural House, natural products, healthy food online"
                    />

                    <meta
                        property="og:title"
                        content="Buy Dates, Nuts, Honey & Ghee Online | Mabrur Natural House"
                    />
                    <meta
                        property="og:description"
                        content="Shop fresh dates, crunchy nuts, pure honey, and organic ghee online from Mabrur Natural House."
                    />
                    <meta property="og:type" content="website" />
                    <meta
                        property="og:url"
                        content="https://mabrurnaturalhouse.com/"
                    />
                    <meta
                        property="og:image"
                        content="https://mabrurnaturalhouse.com/images/home-banner.jpg"
                    />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta
                        name="twitter:title"
                        content="Buy Dates, Nuts, Honey & Ghee Online | Mabrur Natural House"
                    />
                    <meta
                        name="twitter:description"
                        content="Shop fresh dates, crunchy nuts, pure honey, and organic ghee online from Mabrur Natural House."
                    />
                    <meta
                        name="twitter:image"
                        content="https://mabrurnaturalhouse.com/images/home-banner.jpg"
                    />
                </Head>

                <div>
                    <div className="relative mt-4 rounded-lg overflow-hidden shadow-lg mb-4">
                        <img
                            src="/images/home-banner.svg"
                            alt="Featured"
                            className="w-full h-60 md:h-96 object-cover"
                        />
                        <div className="absolute inset-0 bg-[#00000075] bg-opacity-50 flex flex-col justify-center items-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
                                {/* আপনার আস্থার ঠিকানা */}
                            </h2>
                            <p className="text-lg md:text-xl text-gray-200 text-center max-w-xl">
                                {/* প্রতিটি ক্রয়ে সন্তুষ্টি */}
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-0 md:mt-10">
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

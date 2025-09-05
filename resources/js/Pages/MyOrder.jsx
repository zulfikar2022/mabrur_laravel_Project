import { Head } from "@inertiajs/react";
import MainLayout from "./MainLayout";

export default function MyOrder({ user }) {
    const orderItems = JSON?.parse(
        localStorage.getItem("mabrur_order_items") || "null"
    );

    return (
        <>
            <MainLayout title="আমার অর্ডার" user={user}>
                <Head>
                    <meta
                        name="description"
                        content="Check your past orders of dates, nuts, honey, and ghee at Mabrur Natural House."
                    />
                    <meta
                        name="keywords"
                        content="my orders, order history, Mabrur Natural House orders"
                    />

                    <meta
                        property="og:title"
                        content="My Orders | Mabrur Natural House"
                    />
                    <meta
                        property="og:description"
                        content="Track your past orders from Mabrur Natural House."
                    />
                    <meta property="og:type" content="website" />
                    <meta
                        property="og:url"
                        content="https://mabrurnaturalhouse.com/my-order"
                    />
                    <meta
                        property="og:image"
                        content="https://mabrurnaturalhouse.com/images/date-banner.jpg"
                    />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta
                        name="twitter:title"
                        content="My Orders | Mabrur Natural House"
                    />
                    <meta
                        name="twitter:description"
                        content="Track your past orders from Mabrur Natural House."
                    />
                    <meta
                        name="twitter:image"
                        content="https://mabrurnaturalhouse.com/images/date-banner.jpg"
                    />
                </Head>

                <h2 className="text-center text-2xl mb-2">আমার অর্ডার</h2>
                {orderItems && orderItems?.id ? (
                    <div className="border p-4 mb-4 bg-white rounded shadow text-black">
                        <p className="font-bold">
                            অর্ডার আইডি:{" "}
                            <span className="font-normal">
                                {orderItems?.id}
                            </span>
                        </p>
                        <p className="font-bold">
                            ক্রেতার নাম:{" "}
                            <span className="font-normal">
                                {orderItems?.name}
                            </span>
                        </p>
                        <p className="font-bold">
                            জেলা:{" "}
                            <span className="font-normal">
                                {orderItems?.district}
                            </span>
                        </p>
                        <p className="font-bold">
                            উপজেলা:{" "}
                            <span className="font-normal">
                                {orderItems?.upazila}
                            </span>
                        </p>
                        <p className="font-bold">
                            ঠিকানা:{" "}
                            <span className="font-normal">
                                {orderItems?.address}
                            </span>
                        </p>
                    </div>
                ) : (
                    <p className="text-center text-red-800">কোনো অর্ডার নেই</p>
                )}
            </MainLayout>
        </>
    );
}

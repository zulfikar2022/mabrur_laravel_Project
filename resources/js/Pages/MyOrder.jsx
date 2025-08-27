import MainLayout from "./MainLayout";

export default function MyOrder({ user }) {
    const orderItems = JSON.parse(
        localStorage.getItem("mabrur_order_items") || "null"
    );
    console.log(orderItems);
    return (
        <>
            <MainLayout title="My Orders" user={user}>
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

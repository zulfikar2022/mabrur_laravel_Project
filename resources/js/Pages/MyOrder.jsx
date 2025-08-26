import MainLayout from "./MainLayout";

export default function MyOrder({ user }) {
    const orderItems = JSON.parse(
        localStorage.getItem("mabrur_order_items") || "null"
    );
    console.log(orderItems);
    return (
        <MainLayout>
            <div className="min-h-screen min-w-full bg-gray-100 text-black">
                <h2 className="text-center text-2xl mb-2">আমার অর্ডারসমূহ</h2>
                {orderItems !== null ? <div>Order</div> : <div>No Order</div>}
            </div>
        </MainLayout>
    );
}

import OrderCard from "../components/OrderCard";
import Pagination from "../components/Pagination";
import MainLayout from "../MainLayout";

export default function ShippedOrders({
    orderDetails: orders,
    user,
    paginationData,
}) {
    return (
        <MainLayout user={user} title="কুরিয়ারকৃত অর্ডারসমূহ">
            <h2 className="text-center text-2xl mb-2">কুরিয়ারকৃত অর্ডারসমূহ</h2>
            {orders.length > 0 ? (
                <div>
                    {orders.map((order) => (
                        <OrderCard key={order.order_info.id} order={order} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-red-800">কোনো অর্ডার নেই</p>
            )}
            <Pagination
                paginationData={paginationData}
                routePath="shipped-orders"
            />
        </MainLayout>
    );
}

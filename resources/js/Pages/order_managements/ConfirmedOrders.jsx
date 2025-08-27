import OrderCard from "../components/OrderCard";
import Pagination from "../components/Pagination";
import MainLayout from "../MainLayout";

export default function OrderStatusCard({
    orderDetails: orders,
    user,
    paginationData,
}) {
    // console.log(orderDetails);
    return (
        <MainLayout user={user} title="Confirmed Orders">
            <h2 className="text-center text-2xl mb-2 ">কনফার্মড অর্ডারসমূহ</h2>
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
                routePath="confirmed-orders"
            />
        </MainLayout>
    );
}

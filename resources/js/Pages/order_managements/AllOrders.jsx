import OrderCard from "../components/OrderCard";
import MainLayout from "../MainLayout";

export default function AllOrders({ user, orderDetails: orders }) {
    return (
        <MainLayout user={user} title="All Orders">
            <h2 className="text-center text-2xl mb-2 ">সকল অর্ডার</h2>
            {orders.length > 0 ? (
                <div>
                    {orders.map((order) => (
                        <OrderCard key={order.order_info.id} order={order} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-red-800">কোনো অর্ডার নেই</p>
            )}
        </MainLayout>
    );
}

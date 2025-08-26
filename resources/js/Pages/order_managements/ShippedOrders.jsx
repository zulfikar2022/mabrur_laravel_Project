import OrderCard from "../components/OrderCard";
import MainLayout from "../MainLayout";

export default function ShippedOrders({ orderDetails: orders, user }) {
    return (
        <MainLayout user={user} title="Shipped Orders">
            <div>
                {orders.map((order) => (
                    <OrderCard key={order.order_info.id} order={order} />
                ))}
            </div>
        </MainLayout>
    );
}

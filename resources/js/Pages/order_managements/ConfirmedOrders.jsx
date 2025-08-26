import OrderCard from "../components/OrderCard";
import MainLayout from "../MainLayout";

export default function OrderStatusCard({ orderDetails: orders, user }) {
    // console.log(orderDetails);
    return (
        <MainLayout user={user} title="Confirmed Orders">
            <div>
                {orders.map((order) => (
                    <OrderCard key={order.order_info.id} order={order} />
                ))}
            </div>
        </MainLayout>
    );
}

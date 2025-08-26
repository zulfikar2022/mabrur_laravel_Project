import OrderCard from "../components/OrderCard";
import MainLayout from "../MainLayout";

export default function DeletedOrders({ orderDetails: orders, user }) {
    return (
        <MainLayout user={user} title="Deleted Orders">
            <h2 className="text-center text-2xl mb-2">বাতিলকৃত অর্ডারসমূহ</h2>
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

import { useState } from "react";
import OrderCard from "../components/OrderCard";
import MainLayout from "../MainLayout";

export default function NewOrders({ user, orderDetails: orders }) {
    return (
        <MainLayout user={user} title="New Orders">
            <h2 className="text-center text-2xl mb-2">নতুন অর্ডারসমূহ</h2>
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

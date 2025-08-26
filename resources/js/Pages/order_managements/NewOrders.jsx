import { useState } from "react";
import OrderCard from "../components/OrderCard";
import MainLayout from "../MainLayout";

export default function NewOrders({ user, orderDetails: orders }) {
    // console.log(orders);
    // const [makeConfirm, setMakeConfirm] = useState(false);
    return (
        <MainLayout user={user} title="New Orders">
            <div>
                {orders.map((order) => (
                    <OrderCard
                        // setMakeConfirm={setMakeConfirm}
                        key={order.id}
                        order={order}
                    />
                ))}
            </div>
        </MainLayout>
    );
}

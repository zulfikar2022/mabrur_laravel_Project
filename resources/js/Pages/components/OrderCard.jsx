import OrderCardInfoPart from "./OrderCardInfoPart";
import OrderCardProductInfo from "./OrderCardProductInfo";
import OrderStatusCard from "./OrderStatusCard";

export default function OrderCard({ order }) {
    // console.log(order.order_info);
    const { is_confirmed, is_paid, is_shipped, is_deleted } = order.order_info;
    console.log(is_confirmed, is_paid, is_shipped, is_deleted);
    return (
        <div className=" flex flex-col md:grid md:grid-cols-3  border p-4 mb-4 bg-white rounded shadow text-black">
            <OrderCardInfoPart orderShippingInfo={order?.order_info} />
            <OrderCardProductInfo
                deliveryCharge={order?.shipping_charge}
                totalPrice={order?.total_amount}
                totalPayableAmount={order?.total_payable_amount}
                products={order?.products}
            />
            <OrderStatusCard
                order_id={order?.order_info?.id}
                is_confirmed={is_confirmed}
                is_paid={is_paid}
                is_shipped={is_shipped}
                is_deleted={is_deleted}
            />
        </div>
    );
}

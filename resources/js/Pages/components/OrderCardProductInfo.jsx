export default function OrderCardProductInfo({
    products,
    deliveryCharge,
    totalPrice,
    totalPayableAmount,
}) {
    function calculateTotalQuantity(quantity) {
        if (Number.isInteger(quantity)) {
            return { kg: quantity, gm: 0 };
        }
        let integerPart = Math.trunc(quantity);
        let decimalPart = quantity - integerPart;

        return { kg: integerPart, gm: Math.ceil(decimalPart * 1000) };
    }
    return (
        <div className="flex flex-col gap-4 border-b pb-4 px-5 md:border-b-0 md:border-r md:pb-0 border-gray-950">
            {products.map((product) => {
                const { kg, gm } = calculateTotalQuantity(product.quantity);

                return (
                    <div key={product.id} className="flex flex-col ">
                        <p className="text-sm ">{product.name}</p>
                        <div>
                            <span className="text-sm">
                                পরিমাণঃ {kg} কেজি {gm} গ্রাম
                            </span>
                            <span className="text-sm ml-4">
                                মূল্যঃ{" "}
                                {(
                                    product?.price_per_kg * product?.quantity
                                ).toFixed(2)}{" "}
                                টাকা
                            </span>
                        </div>
                    </div>
                );
            })}

            <div className="border-t pt-2 flex flex-col gap-2 border-gray-500">
                <p className="text-sm">
                    ডেলিভারি চার্জঃ {deliveryCharge.toFixed(2)} টাকা
                </p>
                <p className="text-sm">
                    মোট মূল্যঃ {parseFloat(totalPrice)?.toFixed(2)} টাকা
                </p>
                <p className="text-sm font-bold">
                    মোট পরিশোধযোগ্যঃ{" "}
                    {parseFloat(totalPayableAmount)?.toFixed(2)} টাকা
                </p>
            </div>
        </div>
    );
}

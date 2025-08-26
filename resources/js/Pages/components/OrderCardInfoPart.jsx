export default function OrderCardInfoPart({ orderShippingInfo }) {
    return (
        <div className="flex flex-col gap-2 px-5 border-r md:border-b-0 border-b pb-4 md:pb-0 border-gray-950">
            <h1>
                <span className="underline">Order ID:</span>{" "}
                <span className="text-2xl">{orderShippingInfo?.id}</span>
            </h1>
            <div className="flex gap-2 justify-between">
                <p>নামঃ</p> <p>{orderShippingInfo?.name}</p>
            </div>

            <div className="flex gap-2 justify-between">
                <p>ফোন নাম্বারঃ</p> <p>{orderShippingInfo?.mobile}</p>
            </div>

            <div className="flex gap-2 justify-between">
                <p>জেলাঃ</p> <p>{orderShippingInfo?.district}</p>
            </div>
            <div className="flex gap-2 justify-between">
                <p>উপজেলা /থানাঃ</p> <p>{orderShippingInfo?.upazila}</p>
            </div>
            <div className="flex gap-2 justify-between">
                <p>ঠিকানাঃ</p> <p>{orderShippingInfo?.address}</p>
            </div>
        </div>
    );
}

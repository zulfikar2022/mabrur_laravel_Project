export default function OrderStatusCard({
    is_confirmed,
    is_paid,
    is_shipped,
    is_deleted,
}) {
    return (
        <div className="p-4 flex flex-col justify-between">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p
                    className={`${
                        is_confirmed ? "bg-gray-500" : "bg-green-500"
                    } px-2 py-1 rounded text-white text-center cursor-pointer`}
                >
                    {is_confirmed ? "কনফার্ম করা হয়েছে" : "কনফার্ম করুন"}
                </p>
                <p
                    className={`${
                        is_shipped ? "bg-gray-500" : "bg-yellow-500"
                    } px-2 py-1 rounded text-white text-center cursor-pointer`}
                >
                    {is_shipped ? "কুরিয়ার করা হয়েছে" : "কুরিয়ার করুন"}
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 md:mt-0">
                <p
                    className={`${
                        is_paid ? "bg-gray-500" : "bg-blue-500"
                    } px-2 py-1 rounded text-white text-center cursor-pointer`}
                >
                    {is_paid ? "পেমেন্ট গ্রহণ করা হয়েছে" : "পেমেন্ট গ্রহণ করুন"}
                </p>
                <p
                    className={`${
                        is_deleted ? "bg-gray-500" : "bg-red-500"
                    } px-2 py-1 rounded text-white text-center cursor-pointer`}
                >
                    {is_deleted
                        ? "অর্ডার বাতিল করা হয়েছে"
                        : "অর্ডার বাতিল করুন"}
                </p>
            </div>
        </div>
    );
}

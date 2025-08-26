import Swal from "sweetalert2";

export default function OrderStatusCard({
    order_id,
    is_confirmed,
    is_paid,
    is_shipped,
    is_deleted,
}) {
    const statusContainer = {
        is_confirmed,
        is_paid,
        is_shipped,
        is_deleted,
    };
    const changeStatus = async (status) => {
        if (statusContainer[status]) {
            Swal.fire({
                title: "Error",
                text: "এই স্ট্যাটাসটি ইতিমধ্যেই পরিবর্তন করা হয়েছে।",
                icon: "error",
            });
            return;
        }
        Swal.fire({
            title: "আপনি কি অর্ডারটির স্ট্যাটাস পরিবর্তন করতে চান?",
            text: "আপনি এটি পূর্বাবস্থায় ফিরিয়ে নিতে পারবেন না!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "হ্যাঁ, পরিবর্তন করুন!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const url = `/api/admin/change-status?status=${status}&order_id=${order_id}`;
                try {
                    const response = await fetch(url, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                    });
                    const data = await response.json();
                    console.log(data);
                    if (data.success) {
                        // Swal.fire({
                        //     title: "অর্ডারটির স্ট্যাটাস পরিবর্তন করা হয়েছে!",
                        //     text: "অর্ডারটির স্ট্যাটাস সফলভাবে পরিবর্তন করা হয়েছে।",
                        //     icon: "success",
                        // });
                        // make a page refresh
                        window.location.reload();
                    } else {
                        Swal.fire({
                            title: "Error",
                            text: data.message,
                            icon: "error",
                        });
                    }
                } catch (error) {
                    console.error("Error:", error);
                    Swal.fire({
                        title: "Error",
                        text: "অর্ডার স্ট্যাটাস পরিবর্তন করতে ব্যর্থ হয়েছে।",
                        icon: "error",
                    });
                }
            }
        });
    };
    return (
        <div className="p-4 flex flex-col justify-between">
            {!is_deleted && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p
                        onClick={() => changeStatus("is_confirmed")}
                        className={`${
                            is_confirmed ? "bg-gray-500" : "bg-green-500"
                        } px-2 py-1 rounded text-white text-center cursor-pointer`}
                    >
                        {is_confirmed ? "কনফার্ম করা হয়েছে" : "কনফার্ম করুন"}
                    </p>
                    <p
                        onClick={() => changeStatus("is_shipped")}
                        className={`${
                            is_shipped ? "bg-gray-500" : "bg-yellow-500"
                        } px-2 py-1 rounded text-white text-center cursor-pointer`}
                    >
                        {is_shipped ? "কুরিয়ার করা হয়েছে" : "কুরিয়ার করুন"}
                    </p>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 md:mt-0">
                {!is_deleted && (
                    <p
                        onClick={() => changeStatus("is_paid")}
                        className={`${
                            is_paid ? "bg-gray-500" : "bg-blue-500"
                        } px-2 py-1 rounded text-white text-center cursor-pointer`}
                    >
                        {is_paid
                            ? "পেমেন্ট গ্রহণ করা হয়েছে"
                            : "পেমেন্ট গ্রহণ করুন"}
                    </p>
                )}
                <p
                    onClick={() => changeStatus("is_deleted")}
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

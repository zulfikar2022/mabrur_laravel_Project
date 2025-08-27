import MainLayout from "../MainLayout";

export default function ShowDeliveryCharge({ user, deliveryCharge }) {
    console.log(deliveryCharge);
    return (
        <MainLayout user={user} title="Current Delivery Charge">
            <h2 className="text-center text-2xl mb-2 ">
                বর্তমান ডেলিভারি চার্জ
            </h2>
            {/* <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                <p className="text-lg">
                    বর্তমান ডেলিভারি চার্জ:{" "}
                    <span className="font-bold">
                        {deliveryCharge ? deliveryCharge.amount : "N/A"} টাকা
                    </span>
                </p>
            </div> */}
        </MainLayout>
    );
}

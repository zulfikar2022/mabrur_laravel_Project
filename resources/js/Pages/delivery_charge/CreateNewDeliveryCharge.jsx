import MainLayout from "../MainLayout";

export default function CreateNewDeliveryCharge({ user }) {
    return (
        <MainLayout user={user} title="Create New Delivery Charge">
            <h2 className="text-center text-2xl mb-2 ">
                নতুন ডেলিভারি চার্জ যুক্ত করুন
            </h2>
        </MainLayout>
    );
}

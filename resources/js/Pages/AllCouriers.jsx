import MainLayout from "./MainLayout";

export default function AllCouriers({ user }) {
    return (
        <MainLayout user={user} title={"All Couriers"}>
            <div>
                <h1>All Couriers</h1>
            </div>
        </MainLayout>
    );
}

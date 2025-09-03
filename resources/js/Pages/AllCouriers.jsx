import MainLayout from "./MainLayout";

export default function AllCouriers({ user, couriers }) {
    console.log(couriers);
    return (
        <MainLayout user={user} title={"All Couriers"}>
            <div>
                <h1 className="text-2xl font-bold mb-4 text-center">
                    সকল কুরিয়ার
                </h1>
                {couriers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {couriers.map((courier) => (
                            <div
                                key={courier.id}
                                className="border p-4 rounded shadow bg-white"
                            >
                                {courier.name}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No couriers found.</p>
                )}
            </div>
        </MainLayout>
    );
}

import MainLayout from "./MainLayout";

export default function Unauthorized({ user }) {
    return (
        <MainLayout title="Unauthorized" user={user}>
            <div className="max-w-md sm:mx-5 md:mx-auto mt-10 p-6 shadow-lg rounded-lg bg-white text-black mb-10">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Unauthorized Access
                </h2>
                <p className="text-center text-gray-500">
                    You do not have permission to access this page.
                </p>
            </div>
        </MainLayout>
    );
}

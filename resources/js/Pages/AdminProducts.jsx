
import Tabs from "./components/Tab";
import MainLayout from "./MainLayout";

export default function AdminProducts({ products, user }) {
    console.log(products, user);
    return (
        <>
            <MainLayout title="Admin Products" user={user}>
                <Tabs products={products} />
            </MainLayout>
        </>
    );
}
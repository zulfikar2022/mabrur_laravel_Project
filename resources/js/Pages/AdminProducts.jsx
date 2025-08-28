import Tabs from "./components/Tab";
import MainLayout from "./MainLayout";

export default function AdminProducts({ products, user }) {
    console.log(products, user);
    return (
        <>
            <MainLayout title="সকল প্রোডাক্ট" user={user}>
                <Tabs products={products} />
            </MainLayout>
        </>
    );
}

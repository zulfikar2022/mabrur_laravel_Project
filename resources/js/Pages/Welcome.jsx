import ProductCard from "./components/ProductCard";
import MainLayout from "./MainLayout";

export default function Welcome({ products, name, user }) {
    console.log({
        products,
        name, user
    });
    return <>
        <MainLayout title="Welcome" user={user}>
            <div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

            </div>
        </MainLayout>
    </>
}
import ProductCard from "./components/ProductCard";
import MainLayout from "./MainLayout";

export default function Badam({ products, user }) {
    return (
        <MainLayout title="Badam" user={user}>
            {
                products.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">কোনো বাদাম পণ্য পাওয়া যায়নি।</p>
                )
            }
        </MainLayout>
    );
}   
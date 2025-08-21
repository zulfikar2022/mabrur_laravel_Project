import ProductCard from "./components/ProductCard";
import MainLayout from "./MainLayout";

export default function Khejur({ products, user }) {
    return (
        <MainLayout>
            {
                products.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">কোনো খেজুর পণ্য পাওয়া যায়নি।</p>
                )
            }
        </MainLayout>
    );
}
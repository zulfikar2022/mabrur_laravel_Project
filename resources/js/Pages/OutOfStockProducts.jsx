import StockProductCard from "@/Components/StockProductCard";
import MainLayout from "./MainLayout";

export default function OutOfStockProducts({ user, products }) {
    return (
        <MainLayout user={user} title="Out of Stock Products">
            <h1 className="text-2xl font-bold mb-4 text-center border-b-2 pb-2 border-black">
                স্টক আউট পণ্যসমূহ
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <StockProductCard key={product.id} product={product} />
                ))}
            </div>
        </MainLayout>
    );
}

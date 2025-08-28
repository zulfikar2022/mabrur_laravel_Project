import ProductCard from "./components/ProductCard";
import MainLayout from "./MainLayout";

export default function Khejur({ products, user }) {
    return (
        <MainLayout user={user} title="খেজুর পণ্যসমূহ">
            {products.length > 0 ? (
                <>
                    <div className="mb-3 text-center bg-white p-6 rounded-lg shadow">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                            খেজুর: প্রকৃতির মিষ্টি উপহার
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            খেজুর শুধু সুস্বাদু নয়, বরং পুষ্টিগুণে ভরপুর। এতে
                            রয়েছে প্রাকৃতিক চিনি, ফাইবার, ভিটামিন ও খনিজ, যা
                            শরীরকে শক্তি ও সুস্থতা দেয়। প্রতিদিনের
                            খাদ্যতালিকায় খেজুর রাখুন, সুস্থ থাকুন।
                        </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </>
            ) : (
                <p className="text-center text-gray-500">
                    কোনো খেজুর পণ্য পাওয়া যায়নি।
                </p>
            )}
        </MainLayout>
    );
}

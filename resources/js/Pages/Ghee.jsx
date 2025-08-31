import ProductCard from "./components/ProductCard";
import MainLayout from "./MainLayout";

export default function Ghee({ products, user }) {
    return (
        <MainLayout user={user} title="ঘি পণ্যসমূহ">
            {products.length > 0 ? (
                <>
                    <div className="mb-3 text-center bg-white p-6 rounded-lg shadow">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                            ঘি: প্রাচীন ঐতিহ্যের সুস্বাদু সংযোজন
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            ঘি শুধু রান্নার উপাদান নয়, এটি আমাদের সংস্কৃতির
                            একটি গুরুত্বপূর্ণ অংশ। ঘি প্রাকৃতিক উপায়ে তৈরি
                            হওয়া মাখনের থেকে তৈরি হয়, যা খাবারের স্বাদ ও
                            পুষ্টিগুণ বাড়ায়। এটি হৃদয় স্বাস্থ্যকর এবং হজমে
                            সহায়ক। ঘি ব্যবহার করে আপনার রান্নায় ঐতিহ্য ও স্বাদ
                            যোগ করুন।
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
                    কোনো ঘি পণ্য পাওয়া যায়নি।
                </p>
            )}
        </MainLayout>
    );
}

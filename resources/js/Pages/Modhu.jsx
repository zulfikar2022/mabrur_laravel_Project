import ProductCard from "./components/ProductCard";
import MainLayout from "./MainLayout";

export default function Modhu({ user, products }) {
    return (
        <MainLayout user={user} title="মধু পণ্যসমূহ">
            <Head>
                <meta
                    name="description"
                    content="Buy natural honey (modhu) online from Mabrur Natural House. Fresh, pure, and full of nutrition."
                />
                <meta
                    name="keywords"
                    content="buy honey online, modhu online, natural honey, pure honey, organic honey"
                />

                <meta
                    property="og:title"
                    content="Buy Natural Honey (Modhu) Online | Mabrur Natural House"
                />
                <meta
                    property="og:description"
                    content="Delicious and pure honey (modhu) sourced naturally from Mabrur Natural House."
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content="https://mabrurnaturalhouse.com/products/specific/modhu"
                />
                <meta
                    property="og:image"
                    content="https://mabrurnaturalhouse.com/images/honey-banner.jpg"
                />

                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content="Buy Natural Honey (Modhu) Online | Mabrur Natural House"
                />
                <meta
                    name="twitter:description"
                    content="Delicious and pure honey (modhu) sourced naturally from Mabrur Natural House."
                />
                <meta
                    name="twitter:image"
                    content="https://mabrurnaturalhouse.com/images/honey-banner.jpg"
                />
            </Head>

            {products.length > 0 ? (
                <>
                    <div className="mb-3 text-center bg-white p-6 rounded-lg shadow">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                            মধু: প্রাকৃতিক মিষ্টতার উৎস
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            মধু প্রাকৃতিক মিষ্টতার একটি চমৎকার উৎস, যা
                            প্রাচীনকাল থেকে আমাদের খাদ্যসংস্কৃতির অংশ। এটি
                            বিভিন্ন পুষ্টিগুণে ভরপুর, যেমন অ্যান্টিঅক্সিডেন্ট,
                            ভিটামিন, এবং খনিজ। মধু শুধুমাত্র স্বাদ বাড়ায় না,
                            এটি স্বাস্থ্যও উন্নত করে। প্রতিদিনের খাবারে মধু যোগ
                            করে আপনার জীবনকে আরও মিষ্টি এবং স্বাস্থ্যকর করুন।
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
                    কোনো মধু পণ্য পাওয়া যায়নি।
                </p>
            )}
        </MainLayout>
    );
}

import ProductCard from "./components/ProductCard";
import MainLayout from "./MainLayout";

export default function Badam({ products, user }) {
    return (
        <MainLayout title="বাদাম পণ্যসমূহ" user={user}>
            <Head>
                <meta
                    name="description"
                    content="Buy premium quality nuts (badam) including almonds, cashews, and more at Mabrur Natural House. Fresh, healthy, and organic."
                />
                <meta
                    name="keywords"
                    content="buy nuts online, buy badam, almonds online, cashews, premium nuts, organic badam, healthy snacks"
                />

                <meta
                    property="og:title"
                    content="Buy Premium Nuts (Badam) Online | Mabrur Natural House"
                />
                <meta
                    property="og:description"
                    content="Order fresh almonds, cashews, and other premium nuts online from Mabrur Natural House."
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content="https://mabrurnaturalhouse.com/products/specific/badam"
                />
                <meta
                    property="og:image"
                    content="https://mabrurnaturalhouse.com/images/nut-banner.jpg"
                />

                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content="Buy Premium Nuts (Badam) Online | Mabrur Natural House"
                />
                <meta
                    name="twitter:description"
                    content="Order fresh almonds, cashews, and other premium nuts online from Mabrur Natural House."
                />
                <meta
                    name="twitter:image"
                    content="https://mabrurnaturalhouse.com/images/nut-banner.jpg"
                />
            </Head>

            {products.length > 0 ? (
                <>
                    <div className="mb-3 text-center bg-white p-6 rounded-lg shadow">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                            স্বাদে ও পুষ্টিতে অনন্য—প্রতিদিন খান স্বাস্থ্যকর
                            বাদাম!
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            শুদ্ধ, পুষ্টিকর ও সুস্বাদু বাদাম আমাদের স্বাস্থ্যের
                            জন্য অত্যন্ত উপকারী। বাদামে রয়েছে প্রোটিন,
                            স্বাস্থ্যকর চর্বি, ফাইবার, ভিটামিন ও খনিজ, যা
                            হৃদযন্ত্র, মস্তিষ্ক ও ত্বকের জন্য উপকারী। প্রতিদিনের
                            খাদ্যতালিকায় বাদাম রাখুন, সুস্থ থাকুন।
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
                    কোনো বাদাম পণ্য পাওয়া যায়নি।
                </p>
            )}
        </MainLayout>
    );
}

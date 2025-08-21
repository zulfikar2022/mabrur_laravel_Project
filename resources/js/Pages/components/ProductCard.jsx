export default function ProductCard({ product }) {
    return (<>
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
            <img src={`http://127.0.0.1:8000/storage/${product.image_path}`} alt={product.name} className="h-32 w-full object-cover rounded" />
            <h3 className="text-lg font-semibold mb-1 text-black">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
            <span className="text-blue-600 font-bold">৳ {product.price_per_kg}/কেজি</span>
            <a href="#"
                className="
                    mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-500 ease-in-out">ক্রয়
                করুন</a>
        </div>
    </>);
}






{
    /*
    <div
            key={product.id}
                    mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-500 ease-in-out">ক্রয়
                    করুন</a>
        </div>
    </>);
}

{
    /*
    <div
            key={product.id}
            className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
            <div className="w-full h-48 mb-4">
                <img
                    // className=" h-1/2 object-cover rounded-t-lg w-full"
                    className="h-4/5 w-full"
                    src={`http://127.0.0.1:8000/storage/${product.image_path}`}
                    alt={product.name}
                />
            </div>
            <h3 className="text-lg font-semibold mb-1 text-black ">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-2 text-center">{product.description}</p>
            <span className="text-blue-600 font-bold">৳ {product.price_per_kg}/কেজি</span>
            <a href="#"
                className="
                    mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-500 ease-in-out">ক্রয়
                করুন</a>
        </div>
    */
}
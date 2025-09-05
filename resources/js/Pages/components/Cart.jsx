import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { MdKeyboardArrowRight, MdStorefront } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import ShippingAddress from "./ShippingAddress";
import { BsCartCheckFill } from "react-icons/bs";
import { useForm } from "@inertiajs/react";

const districtsWithUpazilas = {
    Bagerhat: [
        "Bagerhat Sadar",
        "Chitalmari",
        "Fakirhat",
        "Kachua",
        "Mollahat",
        "Mongla",
        "Morrelganj",
        "Rampal",
        "Sarankhola",
    ],
    Bandarban: [
        "Bandarban Sadar",
        "Alikadam",
        "Lama",
        "Naikhongchhari",
        "Rowangchhari",
        "Ruma",
        "Thanchi",
    ],
    Barguna: [
        "Barguna Sadar",
        "Amtali",
        "Bamna",
        "Betagi",
        "Patharghata",
        "Taltali",
    ],
    Barishal: [
        "Barishal Sadar",
        "Agailjhara",
        "Babuganj",
        "Bakerganj",
        "Banaripara",
        "Gournadi",
        "Hizla",
        "Mehendiganj",
        "Muladi",
        "Wazirpur",
    ],
    Bhola: [
        "Bhola Sadar",
        "Borhanuddin",
        "Char Fasson",
        "Daulatkhan",
        "Lalmohan",
        "Manpura",
        "Tazumuddin",
    ],
    Bogura: [
        "Bogra Sadar",
        "Adamdighi",
        "Dhunot",
        "Dupchanchia",
        "Gabtali",
        "Kahaloo",
        "Nandigram",
        "Sariakandi",
        "Shajahanpur",
        "Sherpur",
        "Shibganj",
        "Sonatala",
    ],
    Brahmanbaria: [
        "Brahmanbaria Sadar",
        "Akhaura",
        "Ashuganj",
        "Bancharampur",
        "Bijoynagar",
        "Kasba",
        "Nabinagar",
        "Nasirnagar",
        "Sarail",
    ],
    Chandpur: [
        "Chandpur Sadar",
        "Faridganj",
        "Haimchar",
        "Hajiganj",
        "Kachua",
        "Matlab Dakshin",
        "Matlab Uttar",
        "Shahrasti",
    ],
    Chattogram: [
        "Anwara",
        "Banshkhali",
        "Boalkhali",
        "Chandanaish",
        "Fatikchhari",
        "Hathazari",
        "Lohagara",
        "Mirsharai",
        "Patiya",
        "Rangunia",
        "Raozan",
        "Sandwip",
        "Satkania",
        "Sitakunda",
    ],
    Chuadanga: ["Chuadanga Sadar", "Alamdanga", "Damurhuda", "Jibannagar"],
    CoxsBazar: [
        "Cox's Bazar Sadar",
        "Chakaria",
        "Kutubdia",
        "Maheshkhali",
        "Pekua",
        "Ramu",
        "Teknaf",
        "Ukhia",
    ],
    Cumilla: [
        "Cumilla Adarsha Sadar",
        "Laksam",
        "Meghna",
        "Muradnagar",
        "Nangalkot",
        "Titas",
        "Barura",
        "Brahmanpara",
        "Burichong",
        "Chandina",
        "Chauddagram",
        "Daudkandi",
        "Debidwar",
        "Homna",
        "Lalmai",
    ],
    Dhaka: ["Dhamrai", "Dohar", "Keraniganj", "Nawabganj", "Savar"],
    Dinajpur: [
        "Dinajpur Sadar",
        "Birampur",
        "Birganj",
        "Biral",
        "Bochaganj",
        "Chirirbandar",
        "Fulbari",
        "Ghoraghat",
        "Hakimpur",
        "Kaharole",
        "Khansama",
        "Nawabganj",
        "Parbatipur",
    ],
    Faridpur: [
        "Faridpur Sadar",
        "Alfadanga",
        "Bhanga",
        "Boalmari",
        "Char Bhadrasan",
        "Madhukhali",
        "Nagarkanda",
        "Sadarpur",
        "Saltha",
    ],
    Feni: [
        "Feni Sadar",
        "Chhagalnaiya",
        "Daganbhuiyan",
        "Fulgazi",
        "Parshuram",
        "Sonagazi",
    ],
    Gaibandha: [
        "Gaibandha Sadar",
        "Fulchhari",
        "Gobindaganj",
        "Palashbari",
        "Sadullapur",
        "Saghata",
        "Sundarganj",
    ],
    Gazipur: ["Gazipur Sadar", "Kaliakair", "Kaliganj", "Kapasia", "Sreepur"],
    Gopalganj: [
        "Gopalganj Sadar",
        "Kasiani",
        "Kotalipara",
        "Muksudpur",
        "Tungipara",
    ],
    Habiganj: [
        "Habiganj Sadar",
        "Ajmiriganj",
        "Bahubal",
        "Baniyachong",
        "Chunarughat",
        "Madhabpur",
        "Nabiganj",
        "Shaistaganj",
    ],
    Jashore: [
        "Jashore Sadar",
        "Abhaynagar",
        "Bagherpara",
        "Chaugachha",
        "Jhikargachha",
        "Keshabpur",
        "Manirampur",
        "Sharsha",
    ],
    Jhalokati: ["Jhalokati Sadar", "Kathalia", "Nalchity", "Rajapur"],
    Jamalpur: [
        "Jamalpur Sadar",
        "Bakshiganj",
        "Dewanganj",
        "Islampur",
        "Madarganj",
        "Melandaha",
        "Sarishabari",
    ],
    Jhenaidah: [
        "Jhenaidah Sadar",
        "Harinakunda",
        "Kaliganj",
        "Kotchandpur",
        "Maheshpur",
        "Shailkupa",
    ],
    Joypurhat: ["Joypurhat Sadar", "Akkelpur", "Kalai", "Panchbibi", "Khetlal"],
    Khagrachhari: [
        "Khagrachhari Sadar",
        "Dighinala",
        "Guimara",
        "Lakshmichhari",
        "Mahalchhari",
        "Manikchhari",
        "Matiranga",
        "Panchhari",
        "Ramgarh",
    ],
    Khulna: [
        "Batiaghata",
        "Dakope",
        "Dumuria",
        "Dighalia",
        "Koyra",
        "Paikgachha",
        "Phultala",
        "Rupsa",
        "Terokhada",
    ],
    Kishoreganj: [
        "Kishoreganj Sadar",
        "Austagram",
        "Bajitpur",
        "Bhairab",
        "Itna",
        "Karimganj",
        "Katiadi",
        "Kuliarchar",
        "Mithamain",
        "Nikli",
        "Pakundia",
        "Tarail",
    ],
    Kurigram: [
        "Kurigram Sadar",
        "Bhurungamari",
        "Chilmari",
        "Phulbari",
        "Nageshwari",
        "Rajarhat",
        "Rowmari",
        "Ulipur",
    ],
    Kushtia: [
        "Kushtia Sadar",
        "Bheramara",
        "Daulatpur",
        "Khoksa",
        "Kumarkhali",
        "Mirpur",
    ],
    Lakshmipur: [
        "Lakshmipur Sadar",
        "Kamalnagar",
        "Ramganj",
        "Raipur",
        "Ramgati",
    ],
    Lalmonirhat: [
        "Lalmonirhat Sadar",
        "Aditmari",
        "Hatibandha",
        "Kaliganj",
        "Patgram",
    ],
    Madaripur: ["Madaripur Sadar", "Dashar", "Kalkini", "Rajoir", "Shibchar"],
    Magura: ["Magura Sadar", "Mohammadpur", "Shalikha", "Sreepur"],
    Manikganj: [
        "Manikganj Sadar",
        "Daulatpur",
        "Ghior",
        "Harirampur",
        "Saturia",
        "Shibalaya",
        "Singair",
    ],
    Meherpur: ["Meherpur Sadar", "Gangni", "Mujibnagar"],
    Moulvibazar: [
        "Moulvibazar Sadar",
        "Barlekha",
        "Juri",
        "Kamalganj",
        "Kulaura",
        "Rajnagar",
        "Sreemangal",
    ],
    Munshiganj: [
        "Munshiganj Sadar",
        "Gazaria",
        "Lohajang",
        "Serajdikhan",
        "Sreenagar",
        "Tongibari",
    ],
    Mymensingh: [
        "Mymensingh Sadar",
        "Bhaluka",
        "Dhobaura",
        "Fulbaria",
        "Gafargaon",
        "Gouripur",
        "Haluaghat",
        "Iswarganj",
        "Muktagachha",
        "Nandail",
        "Phulpur",
        "Trishal",
    ],
    Naogaon: [
        "Naogaon Sadar",
        "Atrai",
        "Badalgachhi",
        "Dhamoirhat",
        "Manda",
        "Mahadevpur",
        "Niamatpur",
        "Patnitala",
        "Porsha",
        "Raninagar",
        "Sapahar",
    ],
    Narail: ["Narail Sadar", "Kalia", "Lohagara"],
    Narayanganj: [
        "Narayanganj Sadar",
        "Araihazar",
        "Bandar",
        "Fatulla",
        "Rupganj",
        "Sonargaon",
    ],
    Narsingdi: [
        "Narsingdi Sadar",
        "Belabo",
        "Monohardi",
        "Palash",
        "Raipura",
        "Shibpur",
    ],
    Natore: [
        "Natore Sadar",
        "Bagatipara",
        "Baraigram",
        "Gurudaspur",
        "Lalpur",
        "Naldanga",
        "Singra",
    ],
    Netrokona: [
        "Netrokona Sadar",
        "Atpara",
        "Barhatta",
        "Durgapur",
        "Kalmakanda",
        "Kendua",
        "Khaliajuri",
        "Madan",
        "Mohanganj",
        "Purbadhala",
    ],
    Nilphamari: [
        "Nilphamari Sadar",
        "Dimla",
        "Domar",
        "Jaldhaka",
        "Kishoreganj",
        "Saidpur",
    ],
    Noakhali: [
        "Noakhali Sadar",
        "Begumganj",
        "Chatkhil",
        "Hatiya",
        "Kabirhat",
        "Senbagh",
        "Sonaimuri",
        "Subarnachar",
    ],
    Pabna: [
        "Pabna Sadar",
        "Atgharia",
        "Bera",
        "Bhangura",
        "Faridpur",
        "Ishwardi",
        "Santhia",
        "Sujanagar",
    ],
    Panchagarh: ["Panchagarh Sadar", "Atwari", "Boda", "Debiganj", "Tentulia"],
    Patuakhali: [
        "Patuakhali Sadar",
        "Bauphal",
        "Dashmina",
        "Dumki",
        "Galachipa",
        "Kalapara",
        "Mirzaganj",
        "Rangabali",
    ],
    Pirojpur: [
        "Pirojpur Sadar",
        "Bhandaria",
        "Kaukhali",
        "Mathbaria",
        "Nazirpur",
        "Nesarabad",
        "Zianagar",
    ],
    Rajbari: ["Rajbari Sadar", "Baliakandi", "Goalanda", "Pangsha"],
    Rajshahi: [
        "Bagha",
        "Bagmara",
        "Charghat",
        "Durgapur",
        "Godagari",
        "Mohanpur",
        "Paba",
        "Puthia",
        "Tanore",
    ],
    Rangamati: [
        "Rangamati Sadar",
        "Bagaichhari",
        "Barkal",
        "Belaichhari",
        "Juraichhari",
        "Kaptai",
        "Kawkhali",
        "Langadu",
        "Naniarchar",
        "Rajasthali",
    ],
    Rangpur: [
        "Rangpur Sadar",
        "Badarganj",
        "Gangachara",
        "Kaunia",
        "Mithapukur",
        "Pirgachha",
        "Pirganj",
        "Taraganj",
    ],
    Satkhira: [
        "Satkhira Sadar",
        "Assasuni",
        "Debhata",
        "Kaliganj",
        "Kalaroa",
        "Shyamnagar",
        "Tala",
    ],
    Shariatpur: [
        "Shariatpur Sadar",
        "Bhedarganj",
        "Damudya",
        "Gosairhat",
        "Naria",
        "Zajira",
    ],
    Sherpur: [
        "Sherpur Sadar",
        "Jhenaigati",
        "Nakla",
        "Nalitabari",
        "Sreebardi",
    ],
    Sirajganj: [
        "Sirajganj Sadar",
        "Belkuchi",
        "Chauhali",
        "Kamarkhanda",
        "Kazipur",
        "Raiganj",
        "Shahjadpur",
        "Tarash",
        "Ullahpara",
    ],
    Sunamganj: [
        "Sunamganj Sadar",
        "Bishwamvarpur",
        "Chhatak",
        "Derai",
        "Dharmapasha",
        "Doarabazar",
        "Jagannathpur",
        "Jamalganj",
        "Sulla",
        "Tahirpur",
    ],
    Sylhet: [
        "Balaganj",
        "Beanibazar",
        "Bishwanath",
        "Companiganj",
        "Fenchuganj",
        "Golapganj",
        "Gowainghat",
        "Jaintiapur",
        "Kanaighat",
        "Sylhet Sadar",
        "Zakiganj",
    ],
    Tangail: [
        "Tangail Sadar",
        "Basail",
        "Bhuapur",
        "Delduar",
        "Ghatail",
        "Gopalpur",
        "Kalihati",
        "Madhupur",
        "Mirzapur",
        "Nagarpur",
        "Sakhipur",
    ],
    Thakurgaon: [
        "Thakurgaon Sadar",
        "Baliadangi",
        "Haripur",
        "Pirganj",
        "Ranisankail",
    ],
};

export default function Cart({ isOpen, district, setDistrict }) {
    const [cartItems, setCartItems] = useState([]);
    const [cartedProducts, setCartedProducts] = useState([]);
    const [quantitiesKg, setQuantitiesKg] = useState([]);
    const [quantitiesGram, setQuantitiesGram] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [seeTotalCost, setSeeTotalCost] = useState(false);
    const [makeOrder, setMakeOrder] = useState(false);
    const [isDeliveryChargeLoading, setIsDeliveryChargeLoading] =
        useState(false);
    const [errorFetchingDeliveryCharge, setErrorFetchingDeliveryCharge] =
        useState("");

    const [shippingCharge, setShippingCharge] = useState(0);

    // CART ADDRESS states

    const [upazila, setUpazila] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");
    const [name, setName] = useState("");

    // an state to rerender the component
    const [renderingController, setRenderingController] = useState(false);

    function formatNumber(num) {
        if (!num) {
            return 0;
        }
        return num % 1 === 0 ? num : Number(num?.toFixed(2));
        // return num;
    }

    const fetchCartItemsFromBackend = () => {
        const uri = `api/products?ids=${cartItems
            .map((item) => item.id)
            .join(",")}`;

        fetch(uri)
            .then((response) => response.json())
            .then((data) => {
                setCartedProducts(() => data?.products || []);
            })
            .catch((error) => {
                console.error("Error fetching cart items:", error);
            });
    };

    // useEffect(() => {
    //     fetch(route("delivery-charge"))
    //         .then((res) => res.json())
    //         .then((data) => {
    //             localStorage.setItem(
    //                 "mabrur_delivery_charge",
    //                 JSON.stringify(data)
    //             );
    //         });
    // }, []);

    useEffect(() => {
        if (isOpen) {
            const items =
                JSON.parse(localStorage.getItem("mabrur_cart_items")) || [];
            setCartItems(items);
        }
        setDistrict("");
        setUpazila("");
    }, [isOpen, renderingController]);

    useEffect(() => {
        if (cartItems.length > 0) {
            fetchCartItemsFromBackend();
            setQuantitiesKg(cartItems.map((item) => item?.quantity || 1));
            setQuantitiesGram(cartItems.map((item) => item?.quantity || 0));
        }
    }, [cartItems]);

    const removeFromCart = (id) => {
        const updatedCartItems = cartItems.filter((item) => item.id !== id);
        const updatedCartedItems = cartedProducts.filter(
            (item) => item.id !== id
        );
        setCartItems(updatedCartItems);
        setCartedProducts(updatedCartedItems);
        setSeeTotalCost(false);
        setDistrict("");
        setUpazila("");
        localStorage.setItem(
            "mabrur_cart_items",
            JSON.stringify(updatedCartItems)
        );

        // window.location.reload();
    };

    return (
        <div className="text-white">
            <div className=" text-2xl font-bold flex justify-between items-center gap-2 mb-4">
                {" "}
                <div>
                    <span>আমার কার্ট</span>
                    <span>
                        <BsCartCheckFill />
                    </span>
                </div>
                <label
                    htmlFor="my-drawer-5"
                    aria-label="close sidebar"
                    className="drawer-overlay btn border-transparent bg-white text-red-600"
                >
                    <svg
                        className="h-6 w-6"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </label>
            </div>
            <div className="">
                {cartItems?.map(function (item, index) {
                    const cartedItemIndividual = cartedProducts.find(
                        (p) => p.id === item.id
                    );

                    return (
                        <div
                            key={item.id}
                            className="relative flex gap-2 items-center p-2 border-b border-gray-700"
                        >
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="absolute top-1 right-1 text-red-600 hover:text-red-500 font-bold border rounded-full border-red-500"
                            >
                                <RxCross2 />
                            </button>

                            <div className="h-16 w-16">
                                <img
                                    className="w-16 h-16 object-cover rounded"
                                    src={`http://127.0.0.1:8000/storage/${cartedItemIndividual?.image_path}`}
                                    alt={cartedItemIndividual?.name}
                                />
                            </div>

                            <div className="flex flex-col">
                                <span className="text-lg font-semibold">
                                    {cartedItemIndividual?.name}
                                </span>
                                <span className="text-sm text-gray-300">
                                    ৳ {cartedItemIndividual?.price_per_kg}/কেজি
                                </span>
                                <div className="flex items-center gap-2 mt-1">
                                    <input
                                        type="number"
                                        onChange={(event) => {
                                            const value =
                                                parseFloat(
                                                    event.target.value
                                                ) || 0;
                                            setQuantitiesKg(
                                                (prevQuantities) => {
                                                    const newQuantities = [
                                                        ...prevQuantities,
                                                    ];
                                                    newQuantities[index] =
                                                        value;
                                                    return newQuantities;
                                                }
                                            );
                                            let localStorageItems = JSON.parse(
                                                localStorage.getItem(
                                                    "mabrur_cart_items"
                                                )
                                            );
                                            // console.log(localStorageItems);

                                            localStorageItems =
                                                localStorageItems.map(
                                                    (storedItem) => {
                                                        if (
                                                            storedItem.id !==
                                                            cartedItemIndividual?.id
                                                        ) {
                                                            return storedItem;
                                                        }
                                                        storedItem[
                                                            "quantity_kg"
                                                        ] = value;
                                                        return storedItem;
                                                    }
                                                );
                                            // console.log(localStorageItems);
                                            localStorage.setItem(
                                                "mabrur_cart_items",
                                                JSON.stringify(
                                                    localStorageItems
                                                )
                                            );
                                            setSeeTotalCost(false);
                                            setRenderingController(
                                                (prev) => !prev
                                            );
                                        }}
                                        defaultValue={formatNumber(
                                            parseFloat(
                                                // cartItems[index].quantity_kg
                                                item.quantity_kg
                                            )
                                        )}
                                        min={0}
                                        className="border border-gray-300 rounded p-1 w-1/4 text-black product-amount-in-kg"
                                    />
                                    <div>
                                        <span className="text-sm text-white">
                                            কেজি
                                        </span>{" "}
                                        |
                                        <span className="text-white">
                                            {" "}
                                            <span>
                                                {formatNumber(
                                                    parseFloat(
                                                        cartedItemIndividual?.price_per_kg
                                                    ) *
                                                        cartItems[index]
                                                            .quantity_kg
                                                )}
                                            </span>{" "}
                                            Taka{" "}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <input
                                        type="number"
                                        onChange={(event) => {
                                            const value =
                                                parseFloat(
                                                    event.target.value
                                                ) || 0;
                                            setQuantitiesGram(
                                                (prevQuantities) => {
                                                    const newQuantities = [
                                                        ...prevQuantities,
                                                    ];
                                                    newQuantities[index] =
                                                        value;
                                                    return newQuantities;
                                                }
                                            );

                                            let localStorageItems = JSON.parse(
                                                localStorage.getItem(
                                                    "mabrur_cart_items"
                                                )
                                            );
                                            localStorageItems =
                                                localStorageItems.map(
                                                    (storedItem, indx) => {
                                                        if (
                                                            storedItem.id !==
                                                            item.id
                                                        ) {
                                                            return storedItem;
                                                        }
                                                        storedItem[
                                                            "quantity_gram"
                                                        ] = value;
                                                        return storedItem;
                                                    }
                                                );
                                            localStorage.setItem(
                                                "mabrur_cart_items",
                                                JSON.stringify(
                                                    localStorageItems
                                                )
                                            );

                                            setSeeTotalCost(false);
                                            setRenderingController(
                                                (prev) => !prev
                                            );
                                        }}
                                        defaultValue={formatNumber(
                                            parseFloat(item.quantity_gram)
                                        )}
                                        min={0}
                                        className="border border-gray-300 rounded p-1 w-1/4 text-black product-amount-in-gram"
                                    />
                                    <div>
                                        <span className="text-sm text-white">
                                            গ্রাম
                                        </span>{" "}
                                        |
                                        <span className="text-white">
                                            {" "}
                                            <span>
                                                {formatNumber(
                                                    (parseFloat(
                                                        cartedItemIndividual?.price_per_kg
                                                    ) *
                                                        cartItems[index]
                                                            .quantity_gram) /
                                                        1000
                                                )}
                                            </span>{" "}
                                            Taka{" "}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div>
                {cartItems.length > 0 && (
                    <div
                        onClick={() => {
                            setSeeTotalCost((prev) => !prev);
                        }}
                        className="text-xl font-semibold border border-white rounded border-1 my-2 py-2 pl-2 flex items-center justify-evenly  hover:cursor-pointer"
                    >
                        {" "}
                        <span>
                            {" "}
                            ডেলিভারি চার্জ সহ পণ্যের মোট মূল্য দেখুন{" "}
                        </span>{" "}
                        {!seeTotalCost ? (
                            <MdKeyboardArrowRight />
                        ) : (
                            <MdKeyboardArrowDown />
                        )}{" "}
                    </div>
                )}
                {seeTotalCost && (
                    <div className="mb-4">
                        <label className="block font-semibold mb-1 text-white">
                            জেলা
                        </label>
                        <select
                            value={district}
                            onChange={async (e) => {
                                setDistrict(e.target.value);
                                setUpazila("");
                                try {
                                    setIsDeliveryChargeLoading(true);
                                    setErrorFetchingDeliveryCharge("");
                                    const res = await fetch(
                                        "/api/calculate-total-charge",
                                        {
                                            method: "POST",
                                            body: JSON.stringify({
                                                products: cartItems,
                                                district: e.target.value,
                                            }),
                                            headers: {
                                                "content-type":
                                                    "application/json",
                                            },
                                        }
                                    );
                                    const data = await res.json();
                                    setTotalPrice(data.totalPrice);
                                    setShippingCharge(data.shippingCharge);
                                } catch (error) {
                                    setErrorFetchingDeliveryCharge(
                                        "দুঃখিত, পেজ রিফ্রেশ দিয়ে আবার ট্রাই করুন। "
                                    );
                                } finally {
                                    setIsDeliveryChargeLoading(false);
                                    // setErrorFetchingDeliveryCharge("");
                                }
                            }}
                            className="w-full border rounded p-2 text-black"
                        >
                            <option className="text-black" value="">
                                -- আপনার জেলা নির্বাচন করুন --
                            </option>
                            {Object.keys(districtsWithUpazilas).map((d) => (
                                <option
                                    className="text-black"
                                    key={d}
                                    value={d}
                                >
                                    {d}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {seeTotalCost && district ? (
                    <div className="bg-white text-black px-2 rounded py-4">
                        <div className="flex justify-between  ">
                            <p>পণ্যের মূল্য: </p>
                            <span className="">
                                {formatNumber(totalPrice)} টাকা
                            </span>
                            <hr />
                        </div>
                        <div className="flex justify-between   border-b border-white ">
                            <p>ডেলিভারি চার্জ: </p>
                            <span className="">
                                {formatNumber(shippingCharge)} টাকা
                            </span>
                            <hr />
                        </div>
                        <div className="flex justify-between  mt-2">
                            <p>মোট মূল্য: </p>
                            <span className="">
                                {formatNumber(totalPrice + shippingCharge)}
                                টাকা
                            </span>
                            <hr />
                        </div>
                    </div>
                ) : (
                    <div>
                        {isDeliveryChargeLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <div>
                                {errorFetchingDeliveryCharge ? (
                                    <p className="text-red-800">
                                        {errorFetchingDeliveryCharge}
                                    </p>
                                ) : (
                                    <p></p>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {cartItems.length > 0 && (
                    <div
                        onClick={() => {
                            setMakeOrder((prev) => !prev);
                        }}
                        className="text-xl font-semibold border border-white rounded border-1 my-2 py-2 pl-2 flex items-center justify-evenly  hover:cursor-pointer"
                    >
                        {" "}
                        <span> ক্যাশ অন ডেলিভারিতে অর্ডার করুন </span>{" "}
                        {!makeOrder ? (
                            <MdKeyboardArrowRight />
                        ) : (
                            <MdKeyboardArrowDown />
                        )}{" "}
                    </div>
                )}
                {makeOrder && (
                    <ShippingAddress
                        district={district}
                        upazila={upazila}
                        setUpazila={setUpazila}
                        mobile={mobile}
                        setMobile={setMobile}
                        address={address}
                        setAddress={setAddress}
                        error={error}
                        setError={setError}
                        cartItems={cartItems}
                        name={name}
                        setName={setName}
                    />
                )}
            </div>
        </div>
    );
}

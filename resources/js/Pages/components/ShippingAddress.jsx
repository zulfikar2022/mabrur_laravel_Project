import React, { useState } from "react";
import Swal from "sweetalert2";

// ✅ Districts with Upazilas (small dataset shown, expand for all)
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

const makeOrderIdAndQuantities = () => {
    const orderIdAndQuantities = [];
    const cartItems = JSON.parse(localStorage.getItem("mabrur_cart_items"));

    cartItems.forEach((item) => {
        const productId = item.id;
        const quantityKg = item.quantity_kg || 0;
        const quantityGram = item.quantity_gram / 1000 || 0;

        orderIdAndQuantities.push({
            id: productId,
            quantity: quantityKg + quantityGram,
        });
    });

    return orderIdAndQuantities;
};

const ShippingAddress = ({
    district,
    setDistrict,
    upazila,
    setUpazila,
    mobile,
    setMobile,
    address,
    setAddress,
    error,
    setError,
    cartItems,
    name,
    setName,
}) => {
    const [isOrdering, setIsOrdering] = useState(false);

    // place order request to the server
    const placeOrder = async () => {
        if (isOrdering) return; // Prevent multiple submissions
        try {
            console.log(
                JSON.stringify({
                    district,
                    upazila,
                    mobile,
                    address,
                    name,
                    products: makeOrderIdAndQuantities(),
                })
            );
            setIsOrdering(true);
            if (!district || !upazila || !mobile || !address) {
                setError("❌ সব ঘর পূরণ করা আবশ্যক।");
                setIsOrdering(false);
                return;
            }
            const response = await fetch("/api/place-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    district,
                    upazila,
                    mobile,
                    address,
                    name,
                    products: makeOrderIdAndQuantities(),
                }),
            });

            const data = await response.json();
            console.log("Order placed successfully:", data);
            localStorage.setItem(
                "mabrur_order_items",
                JSON.stringify(data?.order)
            );
        } catch (error) {
            setError("❌ অর্ডার দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");

            console.error("Error placing order:", error);
        } finally {
            setIsOrdering(false);
        }
    };

    // ✅ Mobile number validation
    const validateMobile = (number) => {
        const regex = /^01\d{9}$/; // must start with 01 and total 11 digits
        return regex.test(number);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateMobile(mobile)) {
            setError(
                "❌ Invalid mobile number. Must be 11 digits starting with 01."
            );
            return;
        }

        setError("");
        Swal.fire({
            title: "অর্ডার গৃহীত হয়েছে",
            text: "আপনার অর্ডারটি গ্রহণ করা হয়েছে। সাথে থাকার জন্য ধন্যবাদ।",
            icon: "success",
        });
    };
    // জেলা, উপজেলা, মোবাইল নাম্বার

    return (
        <div>
            {district && cartItems?.length > 0 && (
                <form
                    onSubmit={handleSubmit}
                    className="p-4 max-w-md mx-auto border rounded shadow-md"
                >
                    {/* District Selection */}

                    {/* Upazila Selection */}
                    {district && cartItems?.length > 0 && (
                        <div className="mb-4">
                            <div className="flex justify-between items-center border-b  mb-2">
                                <span className="block font-semibold  text-white">
                                    জেলা
                                </span>
                                <span className="text-white font-bold text-lg">
                                    {district}
                                </span>
                            </div>
                            <label className="block font-semibold mb-1">
                                উপজেলা
                            </label>
                            <select
                                value={upazila}
                                onChange={(e) => setUpazila(e.target.value)}
                                className="w-full border rounded p-2 text-black"
                            >
                                <option className="text-black" value="">
                                    -- Select Upazila --
                                </option>
                                {districtsWithUpazilas[district].map((u) => (
                                    <option
                                        className="text-black"
                                        key={u}
                                        value={u}
                                    >
                                        {u}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Mobile & Address */}
                    {upazila && cartItems?.length > 0 && (
                        <>
                            <div className="mb-4">
                                <div className="mb-4">
                                    <label className="block font-semibold mb-1 text-white">
                                        আপনার নাম
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        className="w-full border rounded p-2 text-black"
                                        placeholder="আপনার নাম"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1 text-white">
                                        মোবাইল নম্বর
                                    </label>
                                    <input
                                        type="text"
                                        value={mobile}
                                        onChange={(e) =>
                                            setMobile(e.target.value)
                                        }
                                        className="w-full border rounded p-2 text-black"
                                        placeholder="01XXXXXXXXX"
                                        maxLength="11"
                                        pattern="01[0-9]{9}"
                                        required
                                    />
                                </div>
                                {error && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {error}
                                    </p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block font-semibold mb-1 text-white">
                                    বিস্তারিত ঠিকানা (ইউনিয়ন পরিষদ,
                                    পাড়া-মহল্লার নাম, পরিচিতির এলাকা উল্লেখ
                                    করুন)
                                </label>
                                <textarea
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    rows={4}
                                    className="w-full border rounded p-2 text-black"
                                    placeholder="ইউনিয়ন পরিষদ, পাড়া-মহল্লার নাম, পরিচিতির এলাকা উল্লেখ করুন"
                                />
                            </div>

                            <button
                                onClick={placeOrder}
                                type="submit"
                                className="bg-blue-500 text-2xl w-full text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                অর্ডার করুন
                            </button>
                        </>
                    )}
                </form>
            )}
        </div>
    );
};

export default ShippingAddress;

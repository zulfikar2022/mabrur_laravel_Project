export default function CourierSelect({ couriers, setData, courierId = 1 }) {
    return (
        <div>
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text text-black">
                        প্রোডাক্টের জন্য কোন কুরিয়ার সার্ভিস ব্যবহার করা হবে?
                    </span>
                </label>
                <select
                    className="rounded my-2"
                    value={courierId}
                    onChange={(e) => setData("courier_id", e.target.value)}
                >
                    {couriers.map((courier) => (
                        <option
                            key={courier.id}
                            value={courier.id}
                            // onChange={() => setData("courier_id", courier.id)}
                            className="text-black rounded input-bordered w-full border-gray-300"
                        >
                            {courier.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

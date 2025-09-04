export default function SelectProductCategory({ setData }) {
    return (
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text text-black">প্রোডাক্টের ধরন</span>
            </label>
            <select
                className="rounded input-bordered w-full border-gray-300 text-black"
                onChange={(e) => setData("category", e.target.value)}
            >
                <option value="date">খেজুর</option>
                <option value="nut">বাদাম</option>
                <option value="mango">আম</option>
                <option value="ghee">ঘি</option>
                <option value="honey">মধু</option>
            </select>
        </div>
    );
}

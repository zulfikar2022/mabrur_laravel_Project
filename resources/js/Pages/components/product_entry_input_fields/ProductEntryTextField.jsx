export default function ProductEntryTextField({
    label,
    type,
    name,
    placeholder,
    setData,
    required = true,
    value = "",
}) {
    console.log(name);
    return (
        <div className="form-control w-full">
            <label htmlFor={name} className="label">
                <span className="label-text text-blue-500">{label}</span>
            </label>
            <input
                id={name}
                type={type}
                name={name}
                placeholder={placeholder}
                className="rounded input-bordered w-full border-gray-300 text-black"
                onChange={(e) => setData(name, e.target.value)}
                required={required}
                value={value}
            />
        </div>
    );
}

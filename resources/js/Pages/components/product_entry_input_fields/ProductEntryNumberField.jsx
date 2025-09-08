export default function ProductEntryNumberField({
    label,
    type,
    name,
    step,
    min,
    placeholder,
    setData,
    data,
    required = true,
    value = "",
}) {
    if (value) {
        return (
            <div className="form-control w-full">
                <label htmlFor={name} className="label">
                    <span className="label-text text-blue-500">{label}</span>
                </label>
                <input
                    id={name}
                    type={type}
                    name={name}
                    step={step}
                    min={min}
                    placeholder={placeholder}
                    className="rounded input-bordered w-full border-gray-300 text-black"
                    onChange={(e) => setData(name, e.target.value)}
                    required={required}
                    value={value || data[name]}
                />
            </div>
        );
    } else {
        return (
            <div className="form-control w-full">
                <label htmlFor={name} className="label">
                    <span className="label-text text-blue-500">{label}</span>
                </label>
                <input
                    id={name}
                    type={type}
                    name={name}
                    step={step}
                    min={min}
                    placeholder={placeholder}
                    className="rounded input-bordered w-full border-gray-300 text-black"
                    onChange={(e) => setData(name, e.target.value)}
                    required={required}
                />
            </div>
        );
    }
}

import { useState } from "react";

export default function FreeDelivery({
    setData,
    yesSelectedProp = false,
    minimumWeight = 1,
    data = null,
}) {
    const [yesSelected, setYesSelected] = useState(yesSelectedProp);
    console.log({ minimumWeight });
    return (
        <div className="border p-4 rounded-lg mb-4">
            <p>এই প্রোডাক্টের জন্য ফ্রি ডেলিভারি রয়েছে?</p>

            <input
                onChange={() => {
                    setYesSelected(true);
                    setData("is_delivery_charge_free", true);
                }}
                type="radio"
                id="yes"
                name="fruit"
                defaultChecked={yesSelectedProp}
                value="yes"
            />
            <label htmlFor="yes">Yes</label>
            <br />

            <input
                onChange={() => {
                    setYesSelected(false);
                    setData("is_delivery_charge_free", false);
                }}
                defaultChecked={!yesSelectedProp}
                type="radio"
                id="no"
                name="fruit"
                value="no"
            />
            <label htmlFor="no">No</label>
            <br />

            <div>
                {yesSelected ? (
                    <div>
                        <label htmlFor="min-weight">
                            ফ্রি ডেলিভারির জন্য ন্যূনতম ওজন (কেজিতে)
                        </label>
                        {minimumWeight === 1 ? (
                            <input
                                id="min-weight"
                                type="number"
                                step={0.5}
                                min={1}
                                placeholder="ফ্রি ডেলিভারির জন্য ন্যূনতম ওজন (কেজিতে)"
                                className="mt-2 p-2 border border-gray-300 rounded w-full"
                                // value={minimumWeight}
                                onChange={(e) =>
                                    setData(
                                        "minimum_weight_for_free_delivery",
                                        e.target.value
                                    )
                                }
                                required
                            />
                        ) : (
                            <input
                                id="min-weight"
                                type="number"
                                step={0.5}
                                min={1}
                                placeholder="ফ্রি ডেলিভারির জন্য ন্যূনতম ওজন (কেজিতে)"
                                className="mt-2 p-2 border border-gray-300 rounded w-full"
                                value={minimumWeight}
                                onChange={(e) =>
                                    setData(
                                        "minimum_weight_for_free_delivery",
                                        e.target.value
                                    )
                                }
                                required
                            />
                        )}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

import { useEffect, useState } from "react";

export default function Cart({ cartItems }) {

    console.log(cartItems);
    return (

        <div className="text-white">
            <div className="text-2xl font-bold ">আমার পছন্দের পণ্যগুলো</div>
            <ul>
                {/* {cartItems.map(item => (
                    <div>
                        <p>{item.name}</p>

                    </div>
                ))} */}
            </ul>
        </div>
    );
}

import React, { useState } from "react";

const DeliveryOptions = ({ subtotalWithoutDelivery, selectedOption, onOptionChange }) => {
    

  return (
    <div className="mb-1">
      <label>Delivery Options</label>
      <div className="grid gap-2 grid-cols-2 items-center border border-gray-400 rounded-xl bg-gray-200 p-2">
        <label className="flex text-xs mt-1 text-black">
          <input
            className="accent-primary mx-1"
            type="radio"
            value="Door Delivery"
            checked={selectedOption === "Door Delivery"}
            onChange={onOptionChange}
          />
          Door Delivery
        </label>
        <label className="flex text-xs mt-1 text-black ">
          <input
            className="accent-primary mx-1"
            type="radio"
            value="CBD Pickup"
            checked={selectedOption === "CBD Pickup"}
            onChange={onOptionChange}
          />
          CBD Pickup
        </label>
      </div>
      <div className="my-2">
        <p className="text-xs text-black font-semibold mt-1">
            <span className="text-xs text-primary">
                Items Total: 
            </span> Kes {subtotalWithoutDelivery}
        </p>
        <p className="text-xs text-black font-semibold mt-1">
            <span className="text-xs text-primary">
                Total:  
            </span>
          Kes {subtotalWithoutDelivery + (selectedOption === "Door Delivery" ? 200 : 0)}
        </p>
      </div>
    </div>
  );
};

export default DeliveryOptions;
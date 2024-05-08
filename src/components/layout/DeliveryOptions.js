import React, { useState } from "react";
import TotalDisplay from "./TotalDisplay";

const DeliveryOptions = ({ subtotalWithoutDelivery, selectedOption, deliveryFee, setDeliveryFee, onOptionChange }) => {
    

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
      <div className="mt-2">
        <TotalDisplay
          subtotalWithoutDelivery={subtotalWithoutDelivery}
          total={subtotalWithoutDelivery + deliveryFee}
        />
      </div>
    </div>
  );
};

export default DeliveryOptions;
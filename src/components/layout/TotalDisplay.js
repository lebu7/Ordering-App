import React from "react";

const TotalDisplay = ({ subtotalWithoutDelivery, total }) => {
  return (
    <div className="my-2">
      <p className="text-xs text-black font-semibold mt-1">
        <span className="text-xs text-primary">Items Total: </span>
        Kes {subtotalWithoutDelivery}
      </p>
      <p className="text-xs text-black font-semibold mt-1">
        <span className="text-xs text-primary">Total: </span>
        Kes {total}
      </p>
    </div>
  );
};

export default TotalDisplay;

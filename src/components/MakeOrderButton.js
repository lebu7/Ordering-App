import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "@/components/AppContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const MakeOrderButton = ({ address, total }) => {
  const router = useRouter();
  const { cartProducts, clearCart } = useContext(CartContext);
  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);
  const [reference, setReference] = useState({}); // Add state for reference

  const handleSubmitOrder = async () => {
    try {
        const response = await fetch('/api/checkout', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          cartProducts,
          total,
          reference,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Order submission response:", data);
        toast.success("Order submitted successfully!");
        clearCart();
        setIsOrderSubmitted(true); // Mark order submission complete

        if (data.successURL) {
          router.push(data.successURL); // Redirect to success page (optional)
        }
      } else {
        console.error("Error submitting order:", await response.text());
        toast.error("An error occurred while placing your order. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (isOrderSubmitted) {
      // Redirect logic can be further customized here if needed
    }
  }, [isOrderSubmitted, router]);

  return (
    <div className="mt-1">
      <button
        type="button"
        disabled={isOrderSubmitted}
        className={`text-xs bg-primary text-white rounded-lg px-5 py-2 w-full ${
          isOrderSubmitted ? "cursor-not-allowed opacity-50" : ""
        }`}
        onClick={handleSubmitOrder}
      >
        {isOrderSubmitted ? "Order Submitted" : "Make Order"}
      </button>
    </div>
  );
};

export default MakeOrderButton;

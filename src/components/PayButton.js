import toast from "react-hot-toast";
import { PaystackButton } from "react-paystack";
import { CartContext } from "@/components/AppContext";
import React, { useContext } from "react";
import { useProfile } from "@/components/UseProfile";

const PayButton = ({subtotal}) => {
    const {data:profileData} = useProfile();

    const config = {
        reference: (new Date()).getTime().toString(),
        email: profileData?.email || "user@example.com",
        amount: 5 * 100,
        publicKey: 'pk_live_373d3cbcc52113b61b15b5ff4eb908577584669d',
        firstname: profileData?.name?.split(" ")[0] || '',
        lastname: profileData?.name?.split(" ")[1] || '',
        currency: 'KES',
      };

    const handlePaystackSuccessAction = (reference) => {
    console.log(reference);
    // Add any other actions you want to perform on success
        toast.success('Payment Successful');
  };

  const handlePaystackCloseAction = () => {
    console.log('closed');
    // Add any other actions you want to perform on close
        toast.error('Payment Cancelled');
  };

  const componentProps = {
    ...config,
    text: `Pay Kes ${subtotal}`,
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };


    return (
        <div className="">
            <PaystackButton {...componentProps} />
        </div>
    );
};

export default PayButton;
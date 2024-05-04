import toast from "react-hot-toast";
import { PaystackButton } from "react-paystack";
import React from "react";
import { useProfile } from "@/components/UseProfile";

const PayButton = ({total}) => {
    const {data:profileData} = useProfile();

    const config = {
        publicKey: 'pk_live_373d3cbcc52113b61b15b5ff4eb908577584669d',
        email: profileData?.email ,
        phone: profileData?.phone,
        amount: total * 100,
        firstname: profileData?.name?.split(" ")[0] || '',
        lastname: profileData?.name?.split(" ")[1] || '',
        currency: 'KES',
        channels: ['mobile_money', 'card'],
        metadata: {
            estate: profileData?.estate,
            city: profileData?.city,
            streetaddress: profileData?.streetAddress,
            country: profileData?.country,
            date: new Date().getTime().toString(),
          },
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
    text: `Pay Kes ${total}`,
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };


    return (
        <div className="mt-1">
            <PaystackButton {...componentProps} className="text-xs bg-primary text-white rounded-lg px-5 py-2 w-full" />
        </div>
    );
};

export default PayButton;
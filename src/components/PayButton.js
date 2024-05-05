import toast from "react-hot-toast";
import { PaystackButton } from "react-paystack";
import React, { useContext } from "react";
import { useProfile } from "@/components/UseProfile";
import { CartContext } from "@/components/AppContext";

const PayButton = ({total, selectedOption}) => {
    const {data:profileData} = useProfile();
    const { cartProducts } = useContext(CartContext);

    const publicKey = 'pk_test_db6371273c98c4828f8b8cd78aaeeec87223e0e2';

    const config = {
        publicKey: publicKey,
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

        const handlePaystackSuccessAction = async (reference) => {
            console.log(reference);
        // Add any other actions you want to perform on success
            const data = {
                reference,
                email: profileData?.email,
                phone: profileData?.phone,
                firstname: profileData?.name?.split(' ')[0] || '',
                lastname: profileData?.name?.split(' ')[1] || '',
                cartProducts,
                amount: total * 100,
                selectedOption,
                ...config.metadata,
            };
            try {
                // Send the data to the server
                const response = await fetch('/api/orders', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
                });
                
                if (response.ok) {
                    toast.success('Payment Successful');
                  } else {
                    toast.error('Failed to save payment data');
                  }
                } catch (error) {
                  toast.error('Failed to save payment data');
                  console.error(error);
                }
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
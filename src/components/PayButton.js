import toast from "react-hot-toast";
import { PaystackButton } from "react-paystack";
import React, { useContext, useState, useEffect } from "react";
import { useProfile } from "@/components/UseProfile";
import { CartContext} from "@/components/AppContext";
import { useRouter } from "next/navigation";

const PayButton = ({total, selectedOption, address}) => {
    const router = useRouter();
    const {data:profileData} = useProfile();
    const { cartProducts, clearCart } = useContext(CartContext);
    const [isCheckoutComplete, setIsCheckoutComplete] = useState(false); // Track session completion

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
        const { reference: ref, message, transaction, status } = reference;  // Destructuring assignment

        if (status === 'success' && message === 'Approved') {
         try{
            const response = await fetch('/api/checkout', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                address,
                selectedOption,
                cartProducts,
                total,
                reference,
              }),
            });
        
            if (response.ok) {
              const data = await response.json();
              console.log('Data sent to server successfully');
              toast.success('Payment Successful!');
              toast.success(`Order ID: ${transaction}`);
              const { successURL } = data;

              clearCart();
              setIsCheckoutComplete(true); // Mark session complete on server success
              if (successURL) {
                router.push(successURL); // Redirect using successURL from response
              } // Redirect to orders page with order _id
            } else {
              console.error('Failed to send data to server:', await response.text());
              toast.error('Payment Successful! Error processing order. Please contact support.');
            }
        } catch (error) {
            console.error("Error processing payment:", error);
            toast.error("Payment Failed. Please try again.");
          }
        } else {
            console.log('Payment not successful:', reference);
            toast.error('Payment Failed. Please try again.');
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

  useEffect(() => {
    if (isCheckoutComplete) {
      // Redirect logic can be further customized here if needed
      
    }
  }, [isCheckoutComplete, router]); 

    return (
        <div className="mt-1">
            <PaystackButton 
                {...componentProps} 
                className="text-xs bg-white text-black rounded-lg px-5 py-2 w-full" />
        </div>
    );
};

export default PayButton;
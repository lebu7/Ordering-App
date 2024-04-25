'use client';
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
    let price = cartProduct.basePrice;
        if (cartProduct.size) {
            price += cartProduct.size.price;
        }
        if (cartProduct.colours?.length > 0) {
            for (const colour of cartProduct.colours) {
                price += colour.price + cartProduct.basePrice;
            }
            if (price) {
                price -= cartProduct.basePrice;
            }
        }
    return price;
}

export function AppProvider({children}) {
    const [cartProducts,setCartProducts] = useState([]);

    const ls = typeof window !== 'undefined' ? window.localStorage : null;

    useEffect(() => {
        if (ls && ls.getItem('cart')) {
            setCartProducts(JSON.parse(ls.getItem('cart')));
        }
    }, [ls]);

    function clearCart() {
        setCartProducts([]);
        saveCartProductsToLocalStorage([]);
        }

    function removeCartProduct(indexToRemove) {
        setCartProducts(prevCartProducts  => {
            const newCartProducts = prevCartProducts
                .filter((v,index) => index !== indexToRemove);
            saveCartProductsToLocalStorage(newCartProducts);
            return newCartProducts;
            });
            toast.success('Removed from cart');
        }
    
    function saveCartProductsToLocalStorage (cartProducts) {
        if (ls) {
            ls.setItem('cart', JSON.stringify(cartProducts));
        }
    }

    function addToCart(product, size=null, colours=[]) {
        setCartProducts(prevProducts => {
            const cartProduct = {...product, size, colours,};
            const newProducts = [...prevProducts, cartProduct];
            saveCartProductsToLocalStorage(newProducts);
            return newProducts;
        });
    }

    return (
        <SessionProvider>
            <CartContext.Provider value={{
                cartProducts,
                setCartProducts,
                addToCart,
                clearCart,
                removeCartProduct,
            }}>
                {children}
            </CartContext.Provider>
        </SessionProvider>
    );
}
'use client';
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function AppProvider({children}) {
    const [cartProducts, setCartProducts] = useState([]);

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
        }
    
    function saveCartProductsToLocalStorage (cartProducts) {
        if (ls) {
            ls.setItem('cart', JSON.stringify(cartProducts));
        }
    }

    function addToCart(product, size=null, colour=null) {
        setCartProducts(prevProducts => {
            const cartProducts = {product, size, colour};
            const newProducts = [...prevProducts, cartProducts];
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
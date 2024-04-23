'use client';
import { SessionProvider } from "next-auth/react";
import { createContext, useState } from "react";


export const CartContext = createContext({});

export function AppProvider({children}) {
    const [cartProducts, setCartProducts] = useState([]);
    function addToCart(product, size=null, colour=null) {
        setCartProducts(prevProducts => {
            const cartProducts = {product, size, colour};
            const newProducts = [...prevProducts, cartProducts];
            return newProducts;
        });
    }
    return (
        <SessionProvider>
            <CartContext.Provider value={{
                cartProducts,
                setCartProducts,
                addToCart,
            }}>
                {children}
            </CartContext.Provider>
        </SessionProvider>
    );
}
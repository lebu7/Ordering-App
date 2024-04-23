'use client';
import Image from "next/image";
import StockItem from "../stock/StockItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";

export default function HomeMenu() {
    const [bestSellers, setBestSellers] = useState([]);
    useEffect(() => {
        fetch('/api/stock-items').then(res => {
            res.json().then(stockItems => {
                setBestSellers(stockItems.slice(-3));
            });
        });
    }, []);
    return (
        <section className="">
            <div className="absolute left-0 right-0 w-full justify-start ">
                {/* <div className="absolute left-0 -top-[70px] text-left -z-10 ">
                    <Image src={'/yoga-pants.png'} width={109} height={189} alt={'yoga-pants'} />
                    </div> */}
                <div className="absolute -top-[140px] right-5 -z-10">
                    <Image src={'/kid.png'} width={127} height={195} alt={'kids'} />
                </div>
            </div>
            <div className="text-center mb-4">
                <SectionHeaders 
                    subHeader={'Check out our'}
                    mainHeader={'Best Sellers'}
                    />
            </div>
            <div className="grid grid-cols-3 gap-4">
                {bestSellers?.length > 0 && bestSellers.map(item => (
                    <StockItem  key={item._id} {...item} />
                ))}
            </div>
        </section>
    );
}
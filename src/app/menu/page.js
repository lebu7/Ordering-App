'use client'
import SectionHeaders from "@/components/layout/SectionHeaders";
import StockItem from "@/components/stock/StockItem";
import { useEffect, useState } from "react";

export default function Menupage() {
    const [categories, setCategories] = useState([]);
    const [stockItems, setStockItems] = useState([]);
    useEffect(() => {
       fetch('/api/categories').then(res => {
           res.json().then(categories => setCategories(categories))
       });
       fetch('/api/stock-items').then(res => {
           res.json().then(stockItems => setStockItems(stockItems))
       });
    }, []);
    return (
        <section className="mt-8">
            {categories?.length > 0 && categories.map(c => (
                <div key={c._id}>
                    <div className="text-center">
                        <SectionHeaders mainHeader={c.name} />
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-6 mb-12">
                        {stockItems.filter(item => item.category === c._id).map(item => (
                            <StockItem {...item} key={item._id} />
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
}
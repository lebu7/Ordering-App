'use client';
import Right from "@/components/icons/Right";
import {useProfile} from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function StockItemsPage() {

    const [stockItems, setStockItems] = useState([]);
    const {loading, data} = useProfile();
    useEffect(() => {
       fetch('/api/stock-items').then(res => {
          res.json().then(stockItems => {
              setStockItems(stockItems);
          }); 
       })
    }, []);

    if (loading) {
        return 'Loading stock items..';
    }

    if (!data.admin) {
        return 'Not an authorized user';
    }

    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={true} />
            <div className="mt-8 max-w-md mx-auto">
                <Link
                    className="button flex" 
                    href={'/stock-items/new'}>
                    <span>Add stock item</span>
                    <Right />
                </Link>
            </div>
            <div className="max-w-md mx-auto">
                <h2 className="text-sm text-gray-500 mt-8">Edit Stock item:</h2>
                <div className="grid grid-cols-3 gap-2">
                    {stockItems?.length > 0 && stockItems.map(item => (
                        <Link 
                            key={item._id}
                            href={'/stock-items/edit/'+item._id} 
                            className="bg-gray-200 p-4 rounded-lg" 
                        >
                            <div className="flex justify-center">
                                <Image 
                                    className="rounded-md"
                                    src={item.image} alt={''} width={100} height={100} />
                            </div>
                            <div className="text-center text-sm pt-1">
                                    {item.name}
                            </div>
                        </Link>
                    ))}
                    </div>
            </div>
        </section>
    );
}
'use client';
import {useState, useEffect} from "react";
import {toast} from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/UseProfile";
import Link from "next/link";
import Left from "@/components/icons/Left";
import { redirect, useParams } from "next/navigation";
import StockItemForm from "@/components/layout/StockItemForm";

export default function EditStockItemPage() {
    
    const {id} = useParams();
    
    const [stockItem, setStockItem] = useState(null);
    const [redirectToItems, setRedirectToItems] = useState(false);
    const {loading, data} = useProfile();

    useEffect(() => {
        fetch('/api/stock-items/').then(res => {
            res.json().then(items => {
               const item = items.find(i => i._id === id);
               setStockItem(item);
            });
        })
    }, [id]);

    async function handleFormSubmit(ev, data) {
        ev.preventDefault();
        data = {...data, _id: id};
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/stock-items', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'},
            });
            if (response.ok)
                resolve();
            else
                reject();
        });

        await toast.promise(savingPromise, {
            loading: 'Saving item..',
            success: 'Item saved!',
            error: 'Error',
        });

        setRedirectToItems(true);
    }

    if (redirectToItems) {
        return redirect('/stock-items');
    }

    if (loading) {
         return 'Loading stock items..';
    }
    
    if (!data.admin) {
        return 'Not an authorized user';
    }

    return (
        <section className="mt-8">
            <UserTabs isAdmin={true} />
            <div className="max-w-md mx-auto mt-8">
                <Link href={'/stock-items'} className="button">
                    <Left />
                    <span>Show all stock items</span>
                </Link>
            </div>
           <StockItemForm stockItem={stockItem} onSubmit={handleFormSubmit} />
        </section>
    );

}
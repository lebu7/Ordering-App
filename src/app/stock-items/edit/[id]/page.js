'use client';
import DeleteButton from "@/components/DeleteButton";
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

    async function handleFormSubmit(data) {
        const ev = window.event;
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

    async function handleDeleteClick() {
        const promise = new Promise(async (resolve, reject) => {  
            const res = await fetch('/api/stock-items?_id=' + id, {
                method: 'DELETE',
            }); 
            if (res.ok) {
                resolve();
            } else {
                reject();
            } 
        });

        await toast.promise(promise, {
            loading: 'Deleting..',
            success: 'Deleted',
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
            <div className="max-w-2xl mx-auto mt-8">
                <Link href={'/stock-items'} className="button max-w-md mx-auto">
                    <Left />
                    <span>Show all stock items</span>
                </Link>
            </div>
            <StockItemForm stockItem={stockItem} onSubmit={handleFormSubmit} />
            <div className="max-w-md mx-auto mt-1">
                <div className="max-w-xs ml-auto pl-4 text-sm">
                    <DeleteButton 
                        label="Delete this item" 
                        onDelete={handleDeleteClick}
                    />
                </div>
            </div>
        </section>
    );

}
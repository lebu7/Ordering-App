'use client';
import {useState, useEffect} from "react";
import {toast} from "react-hot-toast";
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/UseProfile";
import Link from "next/link";
import Left from "@/components/icons/Left";
import { redirect } from "next/navigation";
import StockItemForm from "@/components/layout/StockItemForm";

export default function NewStockItemPage() {

    const [redirectToItems, setRedirectToItems] = useState(false);
    const {loading, data} = useProfile();

    async function handleFormSubmit(ev, data) {
        ev.preventDefault();
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/stock-items', {
                method: 'POST',
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
            <div className="max-w-2xl mx-auto mt-8">
                <Link href={'/stock-items'} className="button max-w-md mx-auto">
                    <Left />
                    <span>Show all stock items</span>
                </Link>
            </div>
            <StockItemForm stockItem={null} onSubmit={handleFormSubmit} />
        </section>
    );
}
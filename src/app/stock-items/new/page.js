'use client';
import {useState, useEffect} from "react";
import {toast} from "react-hot-toast";
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/UseProfile";
import Link from "next/link";
import Left from "@/components/icons/Left";
import { redirect } from "next/navigation";

export default function NewStockItemPage() {

    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [basePrice, setBasePrice] = useState('');
    const [redirectToItems, setRedirectToItems] = useState(false);
    const {loading, data} = useProfile();

    async function handleFormSubmit(ev) {
        ev.preventDefault();
        const data = {image, name, description, basePrice,};
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
            <div className="max-w-md mx-auto mt-8">
                <Link href={'/stock-items'} className="button">
                    <Left />
                    <span>Show all stock items</span>
                </Link>
            </div>
            <form onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto">
                <div 
                    className="flex items-start gap-4"
                    style={{gridTemplateColumns: '.3fr .7fr'}}>
                    <div>
                        <EditableImage link={image} setLink={setImage} />
                    </div>
                    <div className="grow">
                        <label>Item Name</label>
                        <input
                             type="text"
                             value={name}
                             onChange={ev => setName(ev.target.value)}
                         />
                        <label>Description</label>
                        <input
                             type="text"
                             value={description}
                             onChange={ev => setDescription(ev.target.value)}
                         />
                        <label>Base price</label>
                        <input
                             type="text"
                             value={basePrice}
                             onChange={ev => setBasePrice(ev.target.value)}
                         />
                        <button type="submit" className="mt-2 px-4 py-2 bg-primary text-white rounded-lg">
                            Save
                        </button>
                    </div>              
                </div>
            </form>
        </section>
    );
}
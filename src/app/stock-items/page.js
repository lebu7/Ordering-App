'use client';
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/EditableImage";
import { useState } from "react";
import toast from "react-hot-toast";

export default function MenuItemsPage() {
   
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [basePrice, setBasePrice] = useState('');
    const {loading, data} = useProfile();

    async function handleFormSubmit(ev) {
        ev.preventDefault();
        const data = {image, name, description, basePrice,};
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = fetch('/api/stock-items', {
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
    }

    if (loading) {
        return 'Loading stock items..'
    }

    if (!data.admin) {
        return 'Not an admin'
    }

    return (
        <section className="mt-8">
            <UserTabs isAdmin={true}/>
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
    )
}
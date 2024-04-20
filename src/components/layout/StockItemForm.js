import EditableImage from "@/components/layout/EditableImage";
import { useState } from "react";
export default function StockItemForm({onSubmit, stockItem}) {

    const [image, setImage] = useState(stockItem?.image || '');
    const [name, setName] = useState(stockItem?.name || '');
    const [description, setDescription] = useState(stockItem?.description || '');
    const [basePrice, setBasePrice] = useState(stockItem?.basePrice || '');
   
    return (
    <form 
        onSubmit={ev => onSubmit(ev, {image, name, description, basePrice})} 
        className="mt-8 max-w-md mx-auto">
    <div 
        className="grid items-start gap-4 p-2"
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
   );
}
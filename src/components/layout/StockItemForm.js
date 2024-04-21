import EditableImage from "@/components/layout/EditableImage";
import StockItemPriceProps from "@/components/layout/StockItemPriceProps";
import { useState } from "react";
export default function StockItemForm({onSubmit, stockItem}) {
    const [image, setImage] = useState(stockItem?.image || '');
    const [name, setName] = useState(stockItem?.name || '');
    const [description, setDescription] = useState(stockItem?.description || '');
    const [basePrice, setBasePrice] = useState(stockItem?.basePrice || '');
    const [sizes, setSizes] = useState(stockItem?.sizes || []);
    const [colours, setColours] = useState(stockItem?.colours || []);

   
    return (
        <form 
            onSubmit={ev => 
                onSubmit(ev, {
                    image, name, description, basePrice, sizes, colours
                })
            } 
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
                    className="text-sm"
                    type="text"
                    value={name}
                    onChange={ev => setName(ev.target.value)}
                />
                <label>Description</label>
                <input
                    className="text-sm"
                    type="text"
                    value={description}
                    onChange={ev => setDescription(ev.target.value)}
                />
                <label>Price</label>
                <input
                    className="text-sm"
                    type="text"
                    value={basePrice}
                    onChange={ev => setBasePrice(ev.target.value)}
                />
                <StockItemPriceProps name={'Sizes'}
                                    addLabel={'Add Size'}
                                    props={sizes} 
                                    setProps={setSizes} />
                <StockItemPriceProps name={'Colour'}
                                    addLabel={'Add Colour'}
                                    props={colours} 
                                    setProps={setColours} />
                <button type="submit">Save</button>
            </div>              
        </div>
    </form>
   );
}
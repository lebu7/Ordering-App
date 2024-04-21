import EditableImage from "@/components/layout/EditableImage";
import StockItemPriceProps from "@/components/layout/StockItemPriceProps";
import { useEffect, useState } from "react";
export default function StockItemForm({onSubmit, stockItem}) {
    const [image, setImage] = useState(stockItem?.image || '');
    const [name, setName] = useState(stockItem?.name || '');
    const [description, setDescription] = useState(stockItem?.description || '');
    const [basePrice, setBasePrice] = useState(stockItem?.basePrice || '');
    const [sizes, setSizes] = useState(stockItem?.sizes || []);
    const [categories, setCategories] = useState();
    const [colours, setColours] = useState(stockItem?.colours || []);

    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories);
            });
        });
    }, []);

    return (
        <form 
            onSubmit={ev => 
                onSubmit(ev, {
                    image, name, description, basePrice, sizes, colours
                })
            } 
            className="mt-8 max-w-md mx-auto">
        <div 
            className="grid items-start gap-4 p-1"
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
                <label>Category</label>
                <select>
                    {categories?.length > 0 && categories.map(c => (
                        <option value={c._id} key={c._id}>{c.name}</option>
                    ))}
                </select>
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
                <StockItemPriceProps name={'Colours'}
                                    addLabel={'Add Colour'}
                                    props={colours} 
                                    setProps={setColours} />
                <button type="submit" className="text-sm">Save</button>
            </div>              
        </div>
    </form>
   );
}
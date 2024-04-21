import Trash from "@/components/icons/Trash";
import Plus from "@/components/icons/Plus";
import ChevronDown from "@/components/icons/ChevronDown";
import ChevronUp from "@/components/icons/ChevronUp";
import { useState } from "react";

export default function StockItemPriceProps({name,addLabel,props,setProps}) {

    const [isOpen, setIsOpen] = useState(false);
    function addProp() {
        setProps(oldProps => {
            return [...oldProps, {name: '', price:0}];
        });
    }

    function editProp(ev, index,prop) {
        const newValue = ev.target.value;
        setProps(prevSizes => {
            const newSizes = [...prevSizes];
            newSizes[index][prop] = newValue;
            return newSizes;
        });
    }

    function removeProp(indexToRemove) {
        setProps(prev => prev.filter((v,index) => index !== indexToRemove));
    }

    return (
        <div className="bg-gray-200 p-2 rounded-md mb-2">
            <button 
                onClick={() => setIsOpen(prev => !prev)}
                className="inline-flex p-0 border-0 justify-start text-sm"
                type="button">
                {isOpen && (
                    <ChevronUp className="w-4 h-4" />
                )}
                {!isOpen && (
                    <ChevronDown className="w-4 h-4" />
                )}
                <span>{name}</span>
                <span>({props?.length})</span>
            </button>
                <div className={isOpen ? 'block' : 'hidden'}>
                    {props?.length > 0 && props.map((size,index) => (
                        <div className="flex items-end gap-2 text-xs" key={size._id} >
                            <div>
                                <label className="text-xs">{name}</label>
                                <input type="text" 
                                        placeholder="Size" 
                                        value={size.name}
                                        onChange={ev => editProp(ev, index, 'name')} 
                                />
                            </div>
                            <div>
                                <label className="text-xs">Extra price</label>
                                <input type="text" placeholder="Extra price" 
                                    value={size.price}
                                    onChange={ev => editProp(ev, index, 'price')} 
                                />
                            </div>
                            <div>
                                <button type="button" 
                                        onClick={() => removeProp(index)}
                                        className="bg-white mb-2 px-2">
                                    <Trash className="w-3 h-3"/>
                                </button>                            </div>
                            </div>
                    ))}
                    <button 
                        type="button"
                        onClick={addProp}
                        className="bg-white items-center text-xs">
                            <Plus className="w-3 h-3" />
                            <span>{addLabel}</span>
                    </button>
                </div>
            </div>
    );
}
import EditableImage from "@/components/layout/EditableImage";
import AddImages from "@/components/layout/AddImages";
import StockItemPriceProps from "@/components/layout/StockItemPriceProps";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

export default function StockItemForm({ onSubmit, stockItem }) {
    const [image, setImage] = useState(stockItem?.image || '');
    const [name, setName] = useState(stockItem?.name || '');
    const [description, setDescription] = useState(stockItem?.description || '');
    const [basePrice, setBasePrice] = useState(stockItem?.basePrice || '');
    const [sizes, setSizes] = useState(stockItem?.sizes || []);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(stockItem?.category || '');
    const [colours, setColours] = useState(stockItem?.colours || []);
    const [imageLinks, setImageLinks] = useState(stockItem?.images || []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/categories');
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        if (!name || !description || !basePrice || !category) {
            alert('Please fill in all required fields.');
            return;
        }
        try {
            await onSubmit({
                image,
                name,
                description,
                basePrice,
                sizes,
                colours,
                category,
                images: imageLinks,
            });
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-8 max-w-xl mx-auto">
            <div className="grid items-start gap-4 p-1 max-w-md mx-auto" style={{ gridTemplateColumns: '.3fr .7fr' }}>
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
                        required
                    />
                    <label>Description</label>
                    <input
                        className="text-sm"
                        type="text"
                        value={description}
                        onChange={ev => setDescription(ev.target.value)}
                        required
                    />
                    <label>Category</label>
                    <select
                        value={category}
                        onChange={ev => setCategory(ev.target.value)}
                        className="text-sm"
                        required
                    >
                        {categories.length > 0 ? (
                            categories.map(c => (
                                <option value={c._id} key={c._id}>{c.name}</option>
                            ))
                        ) : (
                            <option>Loading categories...</option>
                        )}
                    </select>
                    <label>Price</label>
                    <input
                        className="text-xs"
                        type="text"
                        value={basePrice}
                        onChange={ev => setBasePrice(ev.target.value)}
                        required
                    />
                    <StockItemPriceProps
                        name='Sizes'
                        addLabel='Add Size'
                        props={sizes}
                        setProps={setSizes}
                    />
                    <StockItemPriceProps
                        name='Colours'
                        addLabel='Add Colour'
                        props={colours}
                        setProps={setColours}
                    />
                    <AddImages initialLinks={imageLinks} setLinks={setImageLinks} />
                    <button type="submit" className="text-sm mt-2">Save</button>
                </div>
            </div>
        </form>
    );
}

StockItemForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    stockItem: PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string,
        description: PropTypes.string,
        basePrice: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        sizes: PropTypes.arrayOf(PropTypes.string),
        colours: PropTypes.arrayOf(PropTypes.string),
        category: PropTypes.string,
        images: PropTypes.arrayOf(PropTypes.string),
    }),
};

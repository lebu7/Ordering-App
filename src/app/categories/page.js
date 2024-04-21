'use client';
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/UseProfile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CategoriesPage() {
    
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const {loading:profileLoading, data:profileData} = useProfile();
    const [editedCategory, setEditedCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories() {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories);
            });
        });
    }

    async function handleCategorySubmit(ev) {
        ev.preventDefault();
        const creationPromise = new Promise(async(resolve, reject) => {
            const data = {name:categoryName};
            if (editedCategory) {
                data._id = editedCategory._id;
            }
            const response = await fetch('/api/categories', {
                method: editedCategory ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            setCategoryName('');
            fetchCategories();
            setEditedCategory(null);
            if (response.ok) 
                resolve();
            else
                reject();
        });
        await toast.promise(creationPromise, {
            loading: editedCategory 
                    ? 'Updating category..' 
                    : 'creating your new category..',
            success: editedCategory ? 'Category updated' : 'Category created',
            error: 'Error!, sorry..',
        });
    }

    async function handleDeleteClick(_id) {
        const promise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/categories?_id=' + _id, {
            method: 'DELETE',
        });
        if (response.ok) {
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

        fetchCategories();
    }

    if (profileLoading) {
        return 'Loading user info..';
    }

    if (!profileData.admin) {
        return 'Not an authorized user';
    }

    return (
        <section className="mt-8 max-w-md mx-auto">
            <UserTabs isAdmin={true} />
                <form className="mt-8" onSubmit={handleCategorySubmit}>
                    <div className="flex gap-1 items-end">
                        <div className="grow">
                            <label className="text-sm">
                                {editedCategory ? 'Update category ' : 'New category name'}
                                {editedCategory && (
                                    <span>: <b>{editedCategory.name}</b></span>
                                )}
                            </label>
                            <input type="text" 
                                   className="text-sm"
                                   value={categoryName}
                                   onChange={ev => setCategoryName(ev.target.value)}
                             />
                        </div>
                        <div className="pb-2 flex gap-1 text-sm">
                            <button className="border border-primary" type="submit">
                                {editedCategory ? 'Update' : 'Create'}
                            </button>
                            <button 
                                type="button"
                                onClick={() => {
                                    setEditedCategory(null);
                                    setCategoryName('');
                                }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
                <div>
                    <h2 className="mt-8 text-sm text-gray-500">Existing Categories</h2>
                        {categories?.length > 0 && categories.map(c => (
                            <div 
                                className="bg-gray-100 rounded-xl p-1 px-4 flex gap-1 mb-1 items-center text-sm" key={c._id}>
                                <div className="font-semibold grow">
                                    {c.name}
                                </div>
                                <div className="flex gap-1">
                                    <button type="button"
                                            onClick={() => {
                                                setEditedCategory(c);
                                                setCategoryName(c.name);
                                                }}
                                            >
                                                Edit
                                    </button>
                                    <button type="button"
                                            onClick={() => handleDeleteClick(c._id)}
                                            >
                                                Delete
                                    </button>                               
                                </div>
                            </div>
                        ))}
                </div>      
        </section>
    );
}
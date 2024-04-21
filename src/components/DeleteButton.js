import { useState } from "react";

export default function DeleteButton({label, onDelete}) {
    const [showConfirm, setShowConfirm] = useState(false);

    if (showConfirm) {
        return (
            <div className="fixed bg-black/80 inset-0 flex items-center h-full justify-center">
                <div className="bg-white p-6 rounded-lg">
                    <div className="text-gray-600 text-sm items-center pl-5">Are you sure you want to delete?</div>
                    <div className="flex gap-2 mt-2 p-2">
                        <button 
                            type="button" 
                            onClick={() => setShowConfirm(false)} 
                            className="text-sm items-center">
                                Cancel
                        </button>
                        <button 
                            onClick={() => {
                                onDelete();
                                setShowConfirm(false);
                            }} 
                            type="button" 
                            className="primary text-sm items-center">
                                yes,&nbsp;delete!
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <button type="button" onClick={() => setShowConfirm(true)} className="bg-white" >
            {label}
        </button>
    );
}
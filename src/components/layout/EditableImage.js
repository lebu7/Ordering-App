import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({link, setLink}) {
    async function handleFileChange(ev) {
        const files = ev.target.files;
        if (files?.length === 1) {
            const data = new FormData;
            data.set('file', files[0]);

    const uploadPromise = fetch('/api/upload', {
                method: 'POST',
                body: data, 
            }).then(response => {
                if (response.ok) {
                    return response.json().then(link => {
                        setLink(link);
                    })
                   }
                   throw new Error('something went wrong');
            });

        await toast.promise(uploadPromise, {
            loading: 'Uploading..',
            success: 'Upload complete!',
            error: 'Upload error',
        });
    }
}

 return (
    <div>
    {link && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Image className="rounded-lg mb-1 mt-1" src={link} width={90} height={90}  alt={'avatar'} />
        </div>
    )}
    {!link && (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
            No image
        </div>
    )}
        <label>
            <input type="file" className="hidden" onChange={handleFileChange} />
            <span className="block border border-gray-500 rounded-xl px-4 py-2 mt-3 text-center text-gray-700 font-semibold cursor-pointer">Edit</span>
        </label>
    </div>
 );
}
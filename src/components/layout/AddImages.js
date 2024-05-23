import { useState } from "react";
import Image from "next/image";
import Trash from "@/components/icons/Trash";
import toast from "react-hot-toast";

export default function AddImages({ initialLinks = [], setLinks }) {
    const [uploading, setUploading] = useState(false);

    async function handleFilesChange(ev) {
        const files = ev.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        const newLinks = [];

        for (const file of files) {
            const data = new FormData();
            data.append('file', file);

            try {
                const uploadResponse = await fetch('/api/upload', {
                    method: 'POST',
                    body: data,
                });

                if (uploadResponse.ok) {
                    const result = await uploadResponse.json();
                    const { link } = result;

                    if (link) {
                        newLinks.push(link);
                        toast.success(`${file.name} uploaded successfully.`);
                    } else {
                        console.error(`Upload succeeded but no link in response for file: ${file.name}`, result);
                        toast.error(`Failed to upload ${file.name}: No link in response.`);
                    }
                } else {
                    console.error(`Failed to upload ${file.name}: ${uploadResponse.statusText}`);
                    toast.error(`Failed to upload ${file.name}.`);
                }
            } catch (error) {
                console.error(`Error uploading ${file.name}:`, error);
                toast.error(`Error uploading ${file.name}: ${error.message}`);
            }
        }

        if (newLinks.length > 0) {
            setLinks(prevLinks => [...prevLinks, ...newLinks]);
        }
        setUploading(false);
    }

    const handleDeleteImage = (index) => {
        setLinks(prevLinks => {
            const updatedLinks = [...prevLinks];
            updatedLinks.splice(index, 1);
            return updatedLinks;
        });
        toast.success('Image deleted successfully.');
    };

    return (
        <div>
            <div>
                {initialLinks.length > 0 ? (
                    initialLinks.map((link, index) => (
                        link ? (
                            <div key={index} style={{ position: 'relative', display: 'inline-block', margin: '5px' }}>
                                <Image src={link} width={90} height={90} alt={`image-${index}`} />
                                <button
                                    onClick={() => handleDeleteImage(index)}
                                    aria-label={`Delete image ${index + 1}`}
                                    style={{ position: 'absolute', top: 0, right: 0, padding: '4px', background: 'transparent', border: 'none', cursor: 'pointer' }}
                                >
                                    <Trash className="w-3 h-3 text-red-500" />
                                </button>
                            </div>
                        ) : (
                            <div key={index} className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
                                Invalid image link
                            </div>
                        )
                    ))
                ) : (
                    <div>No images</div>
                )}
            </div>
            <label htmlFor="imageInput" className="block border border-gray-500 rounded-xl px-4 py-2 mt-3 text-center text-gray-700 font-semibold cursor-pointer">
                Add Images
                <input type="file" id="imageInput" multiple className="hidden" onChange={handleFilesChange} />
            </label>
            {uploading && <div>Uploading...</div>}
        </div>
    );
}

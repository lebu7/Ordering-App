import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({ link, setLink }) {
    async function handleFileChange(ev) {
        const files = ev.target.files;
        if (files?.length === 1) {
            const data = new FormData();
            data.set('file', files[0]);

            try {
                const uploadResponse = await fetch('/api/upload', {
                    method: 'POST',
                    body: data,
                });

                if (uploadResponse.ok) {
                    const result = await uploadResponse.json();
                    const { link: uploadedLink } = result;

                    if (uploadedLink) {
                        setLink(uploadedLink);
                        toast.success('Upload complete!');
                    } else {
                        console.error('Upload succeeded but no link in response:', result);
                        toast.error('Upload error: No link in response.');
                    }
                } else {
                    console.error('Failed to upload:', uploadResponse.statusText);
                    toast.error('Upload error.');
                }
            } catch (error) {
                console.error('Error uploading:', error);
                toast.error('Upload error.');
            }
        }
    }

    return (
        <div>
            {link ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Image className="rounded-lg mb-1 mt-1" src={link} width={90} height={90} alt="avatar" />
                </div>
            ) : (
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

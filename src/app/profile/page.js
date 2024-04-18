'use client';
import InfoBox from "@/components/layout/InfoBox";
import SuccessBox from "@/components/layout/SuccessBox";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const session = useSession();
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState('');
     const {status} = session;

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data.user.name);
            setImage(session.data.user.image);
        }
    }, [session, status]);

    async function handleProfileInfoUpdate(ev) {
        ev.preventDefault();


        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name:userName, image}),
            });
            if (response.ok)
                resolve()
            else
                reject();
        });

        await toast.promise(savingPromise, {
            loading: 'Saving...',
            success: 'Profile saved!',
            error: 'Error',
        });

    }

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
                        setImage(link);
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


    if (status === 'loading') {
        return 'Loading...'
    }

    if (status === 'unauthenticated') {
         return redirect('/login');
    }

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl font-semibold mb-4">
                Profile
            </h1>
            <div className="max-w-md mx-auto">
                <div className="flex gap-x-3 items-center">
                    <div>
                        <div className="p-2 rounded-lg relative">
                        {image && (
                            <Image className="rounded-lg mb-1 mt-1" src={image} width={90} height={90}  alt={'avatar'} />
                        )}
                            <label>
                                <input type="file" className="hidden" onChange={handleFileChange} />
                                <span className="block border border-gray-500 rounded-xl px-6 py-2 mt-3 text-center cursor-pointer">Edit</span>
                            </label>
                        </div>
                    </div>
                        <form className="grow" onSubmit={handleProfileInfoUpdate}>
                            <input type="text" placeholder="First & Last name"
                            value={userName} onChange={ev => setUserName(ev.target.value)}/>
                            <input type="email" disabled={true} value={session.data.user.email}/>
                            <button type="submit">Save</button>
                        </form>
                </div>
            </div>
        </section>
    );
}
'use client';
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const session = useSession();
    const [userName, setUserName] = useState('');
    const [ saved, setsaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const {status} = session;

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data.user.name);
        }
    }, [session, status]);

    async function handleProfileInfoUpdate(ev) {
        ev.preventDefault();
        setsaved(false);
        setIsSaving(true);
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name:userName}),
        });
        setIsSaving(false);
        if (response.ok) {
            setsaved(true);
        }

    }

    async function handleFileChange(ev) {
        const files = ev.target.files;
        if (files?.length === 1) {
            const data = new FormData;
            data.set('file', files[0]);
            await fetch('/api/upload', {
                method: 'POST',
                body: data,
           }); 
        }
    }

    if (status === 'loading') {
        return 'Loading...'
    }

    if (status === 'unauthenticated') {
         return redirect('/login');
    }

    const userImage = session.data.user.image;

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl font-semibold mb-4">
                Profile
            </h1>
            <div className="max-w-md mx-auto">
                {saved && (
                    <h2 className="text-center bg-green-100 p-2 rounded-lg border border-green-300">
                        Profile saved!
                    </h2>
                )}
                {isSaving && (
                    <h2 className="text-center bg-blue-100 p-2 rounded-lg border border-blue-300">
                    Saving..
                </h2>
                )}
                <div className="flex gap-x-3 items-center">
                    <div>
                        <div className="p-2 rounded-lg relative">
                            <Image className="rounded-lg mb-1 mt-1" src={userImage} width={90} height={90}  alt={'avatar'} />
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
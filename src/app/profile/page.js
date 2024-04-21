'use client';
import EditableImage from "@/components/layout/EditableImage";
import InfoBox from "@/components/layout/InfoBox";
import SuccessBox from "@/components/layout/SuccessBox";
import UserTabs from "@/components/layout/UserTabs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const session = useSession();
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState('');
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [isAdmin, setIsAdmin] = useState('false');
    const [profileFetched, setProfileFetched] = useState(false);
    const {status} = session;

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data.user.name);
            setImage(session.data.user.image);
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                   setPhone(data.phone);
                   setStreetAddress(data.streetAddress);
                   setPostalCode(data.postalCode);
                   setCity(data.city);
                   setCountry(data.country); 
                   setIsAdmin(data.admin);
                   setProfileFetched(true);
                })
            });
        }
    }, [session, status]);

    async function handleProfileInfoUpdate(ev) {
        ev.preventDefault();


        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name:userName, 
                    image,
                    streetAddress,
                    phone,
                    postalCode,
                    city,
                    country,
                }),
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

    if (status === 'loading' || !profileFetched) {
        return 'Loading...'
    }

    if (status === 'unauthenticated') {
         return redirect('/login');
    }

    return (
        <section className="mt-8">
            <UserTabs isAdmin={isAdmin} />
            <div className="max-w-2xl mx-auto mt-8">
                <div className="flex gap-x-3 max-w-md mx-auto">
                    <div>
                        <div className="p-2 rounded-lg relative ">
                            <EditableImage link={image} setLink={setImage} />
                        </div>
                    </div>
                        <form className="grow" onSubmit={handleProfileInfoUpdate}>
                            <label>
                                First & Last Name
                            </label>
                                <input 
                                    className="text-sm"
                                    type="text" placeholder="First & Last name"
                                    value={userName} onChange={ev => setUserName(ev.target.value)}
                                    />
                            <label>
                                Email  
                            </label>
                                <input
                                    className="text-sm" 
                                    type="email" 
                                    disabled={true} 
                                    value={session.data.user.email}
                                    placeholder={'email'}
                                />
                                <label>
                                    Phone Number  
                                </label>
                                <input
                                    className="text-sm" 
                                    type="tel" 
                                    placeholder="Phone Number" 
                                    value={phone} onChange={ev => setPhone(ev.target.value)} 
                                />
                                <label>
                                    Address 
                                </label>
                                <input 
                                    className="text-sm"
                                    type="text" placeholder="Street address/ Apartments" 
                                    value={streetAddress} onChange={ev => setStreetAddress(ev.target.value)} 
                                />
                                <div className="flex gap-2">
                                <div>
                                    <label>
                                    City/ Town  
                                    </label>
                                    <input
                                        className="text-sm"
                                        type="text" 
                                        placeholder="City/Town" 
                                        value={city} onChange={ev => setCity(ev.target.value)} 
                                    />
                                </div>
                                <div>
                                    <label>
                                    Postal Code  
                                    </label>
                                    <input 
                                        className="text-sm"
                                        type="text" 
                                        placeholder="Postal code" 
                                        value={postalCode} onChange={ev => setPostalCode(ev.target.value)} 
                                    />
                                </div>
                                </div>
                                <label>
                                    Country  
                                </label>
                                <input 
                                    className="text-sm"
                                    type="text" 
                                    placeholder="Country" 
                                    value={country} onChange={ev => setCountry(ev.target.value)} 
                                />
                                <button type="submit">Save</button>
                        </form>
                </div>
            </div>
        </section>
    );
}
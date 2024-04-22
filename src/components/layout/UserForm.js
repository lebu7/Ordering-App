'use client';
import EditableImage from "@/components/layout/EditableImage";
import { useProfile } from "@/components/UseProfile";
import { useState } from "react";

export default function UserForm({user, onSave}) {
    const [userName, setUserName] = useState(user?.name || '');
    const [image, setImage] = useState(user?.image || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
    const [postalCode, setPostalCode] = useState(user?.postalCode || '');
    const [city, setCity] = useState(user?.city || '');
    const [country, setCountry] = useState(user?.country || '');
    const [admin, setAdmin] = useState(user?.admin || false);
    const {data:loggedInUserData} = useProfile();

    return (
        <div className="flex gap-x-3 max-w-md mx-auto">
                    <div>
                        <div className="p-2 rounded-lg relative ">
                            <EditableImage link={image} setLink={setImage} />
                        </div>
                    </div>
                        <form 
                            className="grow" 
                            onSubmit={ev => 
                                onSave(ev, {
                                    name:userName, image, phone, admin,
                                     streetAddress, postalCode, city, country,})
                            }
                        >
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
                                    value={user.email}
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
                                    Estate  
                                    </label>
                                    <input 
                                        className="text-sm"
                                        type="text" 
                                        placeholder="Estate" 
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
                                {loggedInUserData?.admin && (
                                    <div>
                                    <label className="p-2 inline-flex items-center gap-2 mb-1" htmlFor="adminCb">
                                        <input 
                                            id="adminCb" type="checkbox" className="w-4 h-4 accent-primary" value={'1'}
                                            checked={admin} 
                                            onClick={ev => setAdmin(ev.target.checked)}
                                            />
                                        <span className="text-sm">Admin</span>
                                    </label>
                                </div>
                                )}
                                <button type="submit">Save</button>
                        </form>
                </div>
    );
}
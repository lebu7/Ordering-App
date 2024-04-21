'use client';
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { useEffect, useState } from "react";
export default function UsersPage() {

    const [users, setUsers] = useState([]);
    const {loading, data} = useProfile();

    useEffect(() => {
       fetch('/api/users').then(response => {
          response.json().then(users => {
              setUsers(users);
          }); 
       })
    }, []);

    if (loading) {
        return 'Loading users..';
    }

    if (!data.admin) {
        return 'Not an authorized user';
    }

    return (
            <section className="mt-8 max-w-2xl mx-auto">
                <UserTabs isAdmin={true} />
                <div className="mt-8 max-w-md mx-auto ">
                    {users.length > 0 && users.map(user => (
                            <div className="bg-gray-200 rounded-xl p-1 px-4 flex gap-1 mb-1 items-center text-sm" key={user._id} >
                                <div className="grid grid-cols-2 md:grid-cols-3 items-center gap-4 grow">
                                    <div className="text-gray-700">
                                        {!!user.name && (<span>{user.name}</span>)}
                                        {!user.name && (<span className="italic">No name</span>)}
                                    </div>
                                    <span className="text-gray-500">{user.email}</span>
                                </div>
                                <div>
                                    <button className="bg-white text-xs">Edit</button>
                                </div>
                            </div>
                        ))}
                </div>
            </section>
    );
}
'use client';
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { redirect, useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
export default function EditUserPage() {
    const {loading, data} = useProfile();
    const [redirectToItems, setRedirectToItems] = useState(false);
    const {id} = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('/api/profile?_id='+id).then(res => {
            res.json().then(user => {
                setUser(user);
            });
        })
    }, [id]);

    async function handleSaveButtonClick(ev, data)  {
        ev.preventDefault();
        const promise = new Promise(async (resolve, reject) => {
        const res = await fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...data, _id: id}),
        });
        if (res.ok)
        resolve();
      else
        reject();

    });

    await toast.promise(promise, {
      loading: 'Saving user..',
      success: 'User saved',
      error: 'An error has occurred while saving the user',
    });

    setRedirectToItems(true);
  }

    if (redirectToItems) {
        return redirect ('/users');
    }

    if (loading) {
        return 'Loading user profile..';
    }

    if (!data.admin) {
        return 'Not an authorized user';
    }

    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={true} />
            <div className="mt-8 max-w-md mx-auto">
                <UserForm user={user} onSave={handleSaveButtonClick} />
            </div>
        </section>
    );
}
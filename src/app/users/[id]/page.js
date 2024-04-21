'use client';
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
export default function EditUserPage() {
    const {loading, data} = useProfile();

    if (loading) {
        return 'Loading user Profile..';
    }

    if (!data.admin) {
        return 'Not an authorized user';
    }

    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={true} />
            <div className="mt-8 max-w-md mx-auto">
                
            </div>
        </section>
    )
}
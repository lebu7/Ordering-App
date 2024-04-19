'use client';
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/UseProfile";

export default function CategoriesPage() {
    
    const {loading:profileLoading, data:profileData} = useProfile();

    if (profileLoading) {
        return 'Loading user info..';
    }

    if (!profileData.admin) {
        return 'Not an admin';
    }

    return (
        <section className="mt-8 max-w lg mx-auto">
            <UserTabs isAdmin={true} />
                Categories        
        </section>
    );
}
'use client';
import Right from "@/components/icons/Right";
import {useProfile} from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { useEffect } from "react";

export default function StockItemsPage() {

    const {loading, data} = useProfile();
    useEffect()

    if (loading) {
        return 'Loading stock items..';
    }

    if (!data.admin) {
        return 'Not an authorized user';
    }

    return (
        <section className="mt-8 max-w-md mx-auto">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                <Link
                    className="button flex" 
                    href={'/stock-items/new'}>
                    <span>Add stock item</span>
                    <Right />
                </Link>
            </div>
        </section>
    );
}
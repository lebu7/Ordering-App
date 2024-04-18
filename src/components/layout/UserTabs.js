import Link from "next/link";

export default function UserTabs(isAdmin) {
    return (
        <div className="flex mx-auto gap-2 tabs justify-center">
                <Link className={'active'} href={'/profile'}>Profile</Link>
                {isAdmin && (
                    <>
                    <Link href={'/categories'}>Categories</Link>
                    <Link href={'/stock-items'}>In Stock</Link>
                    <Link href={'/users'}>Users</Link>
                    </>
                )}
            </div>
    );
}
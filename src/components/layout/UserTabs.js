'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs({isAdmin}) {
    const path = usePathname();
    return (
        <div className="flex mx-auto gap-2 tabs justify-center text-sm">
                <Link
                    className={path === '/profile' ? 'active' : ''} 
                    href={'/profile'}
                    >
                        Profile
                </Link>
                {isAdmin && (
                    <>
                    <Link 
                        href={'/categories'}
                        className={path === '/categories' ? 'active' : ''} 
                        >
                            Categories
                    </Link>
                    <Link 
                        href={'/stock-items'}
                        className={path.includes('stock-items') ? 'active' : ''} 
                        >
                            In Stock
                    </Link>
                    <Link 
                        href={'/orders'}
                        className={path === '/orders' ? 'active' : ''} 
                        >
                            Orders
                    </Link>
                    <Link 
                        href={'/users'}
                        className={path.includes('/users') ? 'active' : ''} 
                        >
                            Users
                    </Link>
                    </>
                )}
            </div>
    );
}
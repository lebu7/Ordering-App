'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs({isAdmin}) {
    const path = usePathname();
    return (
        <div className="flex mx-auto gap-2 tabs justify-center">
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
                        href={'/users'}
                        className={path === '/users' ? 'active' : ''} 
                        >
                            Users
                    </Link>
                    </>
                )}
            </div>
    );
}
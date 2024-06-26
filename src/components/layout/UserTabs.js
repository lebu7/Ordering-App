'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs({isAdmin}) {
    const path = usePathname();
    return (
        <div className="flex mx-auto gap-1 tabs justify-center text-sm sm:text-xs md:text-sm lg:gap-2 lg:text-sm xl:text-sm 2xl:text-sm flex-wrap xs:text-xs">
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
                            Stock
                    </Link>
                
                    <Link 
                        href={'/users'}
                        className={path.includes('/users') ? 'active' : ''} 
                        >
                            Users
                    </Link>
                    </>
                )}
                    <Link 
                        href={'/orders'}
                        className={path === '/orders' ? 'active' : ''} 
                        >
                            Orders
                    </Link>
            </div>
    );
}
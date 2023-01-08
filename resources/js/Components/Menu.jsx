import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function Menu({ user, href, children }) {
    
    let menu;
    if (user.role == 'admin') {
        menu = <Link href={route('dashboard')} className="text-sm text-gray-700 dark:text-gray-500 underline">Dashboard</Link>
    } else {
        menu = <Link href={route('logout')} method="post" as="button">Log Out</Link>                                              
    }

    return (
        <Link
            href={href}
            className={"text-sm text-gray-700 dark:text-gray-500 underline"}
        >
            {children}
        </Link>
    );
}
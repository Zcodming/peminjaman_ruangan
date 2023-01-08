import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function SideLink({ href, active, children }) {
    return (
        <Link
            href={href}
            className={
                active
                    ? "text-xs uppercase py-3 font-bold block text-blue-500 hover:text-blue-600"
                    : "text-xs uppercase py-3 font-bold block text-gray-500 hover:text-gray-600"
            }
        >
            {children}
        </Link>
    );
}

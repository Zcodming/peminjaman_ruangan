import React, { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Link, Head } from "@inertiajs/inertia-react";

export default function Index({ auth, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [collapseShow, setCollapseShow] = React.useState("hidden");

    let menu;
    let whatRole;
    if (auth.user) {
        whatRole = auth.user.role;
    }

    if (whatRole == "admin") {
        menu = (
            <div className="md:ml-64 hidden sm:flex sm:items-center sm:ml-6 justify-between">
                <div className="ml-3 relative">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="inline-flex rounded-md">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                >
                                    ADMIN
                                    <svg
                                        className="ml-2 -mr-0.5 h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </span>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Link
                                href={route("dashboard")}
                                className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                            >
                                Dashboard
                            </Link>
                            <Dropdown.Link
                                href={route("logout")}
                                method="post"
                                as="button"
                            >
                                Log Out
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>
        );
    } else {
        menu = (
            <div className="md:ml-64 hidden sm:flex sm:items-center sm:ml-6 justify-between">
                <div className="ml-3 relative">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="inline-flex rounded-md">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                >
                                    USER
                                    <svg
                                        className="ml-2 -mr-0.5 h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </span>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link
                                href={route("logout")}
                                method="post"
                                as="button"
                            >
                                Log Out
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>
        );
    }

    // console.log('props', auth);

    return (
        <>
            <div>
                <nav className="top-0 left-0 right-0  bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="shrink-0 flex items-center">
                                    <Link href="/">
                                        <ApplicationLogo className="block h-9 w-auto text-gray-500" />
                                    </Link>
                                </div>

                                <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                    <NavLink
                                        href="/"
                                        active={
                                            !route().current("dataruangan") &&
                                            !route().current("pinjamruang") &&
                                            !route().current("pengajuan") &&
                                            !route().current("ruangseminar") &&
                                            !route().current("pinjam")
                                        }
                                    >
                                        Welcome
                                    </NavLink>
                                    <NavLink
                                        href="/pinjamruang"
                                        active={
                                            route().current("pinjamruang") ||
                                            route().current("pengajuan")
                                        }
                                    >
                                        Pinjam Ruang
                                    </NavLink>
                                    <NavLink
                                        href="/ruangseminar"
                                        active={route().current("ruangseminar")}
                                    >
                                        Pinjam Ruang Seminar
                                    </NavLink>
                                </div>
                            </div>

                            <div className="hidden sm:flex sm:items-center sm:ml-6">
                                <div className="ml-3 relative">
                                    <span className="inline-flex rounded-md">
                                        {auth.user ? (
                                            menu
                                        ) : (
                                            <>
                                                <Link
                                                    href={route("login")}
                                                    className="text-sm text-gray-700 dark:text-gray-500 underline"
                                                >
                                                    Log in
                                                </Link>
                                            </>
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                <Head title="Welcome" />

                <main className="items-center">{children}</main>
            </div>
        </>
    );
}

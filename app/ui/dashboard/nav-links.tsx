"use client";

import {
    UserGroupIcon,
    HomeIcon,
    DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
    { name: "Home", href: "/dashboard", icon: HomeIcon },
    { name: "Jobs", href: "/dashboard/jobs", icon: DocumentDuplicateIcon },
    { name: "Contacts", href: "/dashboard/contacts", icon: UserGroupIcon },
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-900 p-3 text-sm font-medium hover:bg-gray-800 hover:text-blue-400 md:flex-none md:justify-start md:p-2 md:px-3",
                            {
                                "bg-sky-900 text-white": pathname === link.href,
                            },
                        )}
                    >
                        <LinkIcon className="w-6" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}
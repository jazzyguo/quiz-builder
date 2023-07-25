import React from "react";
import { usePathname } from "next/navigation";
import Link from 'next/link'

import { useAuth } from "@/contexts/AuthContext";
import { LoginButton, SignupButton } from "@/features/auth";
import { UserMenuList } from "@/components/UserMenuList";

const TopNav = () => {
    const { user } = useAuth();
    const pathname = usePathname();

    const isSignupPage = ["/signup", "/signin"].includes(pathname);

    return (
        <div className="px-8 flex items-center justify-between bg-black">
            <Link
                href="/"
            >
                <h1>
                    Quiz Builder
                </h1>
            </Link>
            {!user.uid ? (
                !isSignupPage && (
                    <div className="flex ">
                        <LoginButton className='mr-4' />
                        <SignupButton />
                    </div>
                )
            ) : (
                <UserMenuList user={user} />
            )}
        </div>
    );
};

export default TopNav;

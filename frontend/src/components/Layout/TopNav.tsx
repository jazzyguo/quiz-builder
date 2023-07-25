import React from "react";
import { usePathname } from "next/navigation";
import Link from 'next/link'

import { useAuth } from "@/contexts/AuthContext";
import { LoginButton, SignupButton } from "@/features/auth";
import { MemoizedUserMenuList } from "@/components/UserMenuList";

const TopNav = () => {
    const { user } = useAuth();
    const pathname = usePathname();

    const isSignupPage = ["/signup", "/signin"].includes(pathname);

    return (
        <div className="px-8 flex flex-col sm:flex-row items-center justify-between bg-black ">
            <Link
                href="/"
            >
                <h1>
                    Quiz Builder
                </h1>
            </Link>
            <div className="flex mb-6 sm:mb-0">
                {!user.uid ? (
                    !isSignupPage && (
                        <>
                            <LoginButton className='mr-4' />
                            <SignupButton />
                        </>
                    )
                ) : (
                    <MemoizedUserMenuList user={user} />
                )}
            </div>

        </div>
    );
};

export default TopNav;

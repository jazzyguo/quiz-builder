"use client"

import { SignInPage } from "@/features/auth";
import { withoutAuth } from "@/components/WithoutAuth";

const Page = () => (
    <div className="page-container">
        <SignInPage />
    </div>
)

export default withoutAuth(Page);

"use client"

import { SignUpPage } from "@/features/auth";
import { withoutAuth } from "@/components/WithoutAuth";

const Page = () => (
    <div>
        <SignUpPage />
    </div>
)

export default withoutAuth(Page);

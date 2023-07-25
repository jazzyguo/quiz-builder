"use client"

import { SignInApp } from "@/features/auth";
import { withAuth } from "@/components/WithAuth";

const SigninPage = () => <SignInApp />;

export default withAuth(SigninPage);

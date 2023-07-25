"use client"

import { SignInApp } from "@/features/auth";
import { withoutAuth } from "@/components/WithoutAuth";

const SigninPage = () => <SignInApp />;

export default withoutAuth(SigninPage);

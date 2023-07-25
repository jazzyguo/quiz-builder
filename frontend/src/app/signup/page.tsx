"use client"

import { SignUpApp } from "@/features/auth";
import { withoutAuth } from "@/components/WithoutAuth";

const SignupPage = () => <SignUpApp />;

export default withoutAuth(SignupPage);

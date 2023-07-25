"use client"

import { SignUpApp } from "@/features/auth";
import { withAuth } from "@/components/WithAuth";

const SignupPage = () => <SignUpApp />;

export default withAuth(SignupPage);

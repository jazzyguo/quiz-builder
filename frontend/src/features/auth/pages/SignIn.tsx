import { SyntheticEvent, useState } from "react";
import Link from "next/link";
import signIn from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";

import { LoginForm } from "../components/LoginForm";

export const SignInPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState<string | null>(null);

    const router = useRouter();

    const onSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        const { error } = await signIn(email, password);

        if (error) {
            console.log(error);
            setLoginError("Account not found");
        } else {
            return router.push("/");
        }
    };

    return (
        <div className="flex flex-col items-center">
            <LoginForm
                error={loginError}
                onSubmit={onSubmit}
                setEmail={setEmail}
                setPassword={setPassword}
            />
            <Link
                href="/signup"
                className="mt-4"
            >
                {`Don't have an account?`}
            </Link>
        </div>
    );
};

import { useState, SyntheticEvent } from "react";
import Link from "next/link";
import signUp from "@/firebase/auth/signup";
import { UserCredential } from "firebase/auth";
import { useRouter } from "next/navigation";

import { LoginForm } from "../components/LoginForm";

const errorMessages: {
    [key: string]: string
} = {
    "Firebase: Password should be at least 6 characters (auth/weak-password).":
        "Password should be at least 6 characters",
    "Firebase: Error (auth/email-already-in-use).": "Account already in use",
};

export const SignUpPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signupError, setSignupError] = useState<null | string>(null);

    const router = useRouter();

    const onSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        const { error }: { result: UserCredential | null, error: any } = await signUp(email, password);

        if (error) {
            const errorMessage = errorMessages[error?.message];
            setSignupError(errorMessage);
            return console.log(error);
        }

        return router.push("/");
    };

    return (
        <div className="flex flex-col items-center">
            <LoginForm
                onSubmit={onSubmit}
                setEmail={setEmail}
                setPassword={setPassword}
                type="signup"
                error={signupError}
            />
            <Link
                href="/signin"
                className="mt-4"
            >
                Already have an account?
            </Link>
        </div>
    );
};

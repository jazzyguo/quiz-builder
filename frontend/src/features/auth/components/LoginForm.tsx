import { memo, SyntheticEvent } from "react";

type Props = {
    setPassword: (password: string) => void;
    setEmail: (email: string) => void;
    onSubmit: (event: SyntheticEvent) => void;
    type?: "signup" | "signin";
    error?: null | string;
};

export const LoginForm = memo(({
    type = "signin",
    setPassword,
    setEmail,
    onSubmit,
    error,
}: Props) => {
    const text = type === "signin" ? "Sign in" : "Sign up";
    return (
        <form
            className="flex flex-col"
            onSubmit={onSubmit}
        >
            <h1>{text}</h1>
            <label htmlFor="email">
                Email
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@mail.com"
                    className="p-1"
                />
            </label>
            <label htmlFor="password">
                Password
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    className="p-1"
                />
            </label>
            {error && <div className="text-red-600">{error}</div>}
            <button
                type="submit"
                className="mt-2 mx-auto"
            >
                {text}
            </button>
        </form>
    );
});

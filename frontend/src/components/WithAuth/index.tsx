import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export const withAuth = (Component: any) => {
    const AuthenticatedComponent = (props: any) => {
        const router = useRouter();
        const { user } = useAuth();
        const pathname = usePathname();

        const isSignupPage = ["/signup", "/signin"].includes(pathname);

        if (!user.uid || (isSignupPage && user.uid)) {
            router.push("/");
            return null;
        }

        return <Component {...props} />;
    };

    return AuthenticatedComponent;
};

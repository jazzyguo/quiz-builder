import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Primarily used for signin / signup pages that an authed user should not be able to access
 */
export const withoutAuth = (Component: any) => {
    const UnauthenticatedComponent = (props: any) => {
        const router = useRouter();
        const { user } = useAuth();

        if (user.uid) {
            router.push("/");
            return null;
        }

        return <Component {...props} />;
    };

    return UnauthenticatedComponent;
};

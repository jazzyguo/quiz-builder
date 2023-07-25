import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export const withAuth = (Component: any) => {
    const AuthenticatedComponent = (props: any) => {
        const router = useRouter();
        const { user } = useAuth();

        if (!user.uid) {
            router.push("/");
            return null;
        }

        return <Component {...props} />;
    };

    return AuthenticatedComponent;
};

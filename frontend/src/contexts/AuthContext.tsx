import React, {
    ReactNode,
    useState,
    useEffect,
    createContext,
    useContext,
} from "react";
import {
    User,
    onAuthStateChanged,
    getAuth,
    IdTokenResult,
} from "firebase/auth";
import app from "@/firebase/config";
import { Loading } from "@/components/Loading";

const auth = getAuth(app);

const initialState = {
    user: {
        accessToken: "",
        emailVerified: false,
        isAnonymous: false,
        metadata: {},
        providerData: [],
        refreshToken: "",
        tenantId: null,
        delete: function (): Promise<void> {
            throw new Error("Function not implemented.");
        },
        getIdToken: function (forceRefresh?: boolean | undefined): Promise<string> {
            throw new Error("Function not implemented.");
        },
        getIdTokenResult: function (
            forceRefresh?: boolean | undefined
        ): Promise<IdTokenResult> {
            throw new Error("Function not implemented.");
        },
        reload: function (): Promise<void> {
            throw new Error("Function not implemented.");
        },
        toJSON: function (): object {
            throw new Error("Function not implemented.");
        },
        displayName: null,
        email: null,
        phoneNumber: null,
        photoURL: null,
        providerId: "",
        uid: "",
    }
}

export const AuthContext = createContext<{ user: User & { accessToken?: string } }>(initialState);

export const useAuth = () => useContext(AuthContext);

/**
 * Providers firebase user object to app 
 */
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User>(initialState.user);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (_user) => {
            console.log("curr user", user);

            if (_user?.uid) {
                setUser(_user);
            } else {
                setUser(initialState.user);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? (
                <div className="flex justify-center pt-20">
                    <Loading />
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};

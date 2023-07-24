import { ReactNode } from "react";
import TopNav from "./TopNav";

export const MainLayout = ({ children }: { children: ReactNode }) => (
    <div>
        <TopNav />
        <div className='p-8'>
            {children}
        </div>
    </div>
);

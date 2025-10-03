import Navbar from "@/components/layout/Navbar.tsx";
import {CategoryBar} from "@/components/feed/CategoryBar.tsx";

export default function NavbarLayout({children}: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center min-h-svh">
            <Navbar/>
            <main className=" flex-1  overflow-y-auto w-full max-w-screen-lg">
                {children}
            </main>
        </div>
    );
}

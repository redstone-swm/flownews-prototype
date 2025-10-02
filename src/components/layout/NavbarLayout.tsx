import NavBar from "@/components/layout/NavBar.tsx";
import {CategoryBar} from "@/components/feed/CategoryBar.tsx";

export default function NavbarLayout({children}: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center min-h-svh">
            <NavBar/>
            <main className=" flex-1  overflow-y-auto w-full max-w-screen-lg">
                {children}
            </main>
        </div>
    );
}

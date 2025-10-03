import Navbar from "@/components/layout/Navbar.tsx";

export default function NavbarOverlayLayout({children}: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center min-h-svh">
            <Navbar variant="transparent-fixed"/>
            <main className="flex-1 overflow-y-auto w-screen">
                {children}
            </main>
        </div>
    );
}

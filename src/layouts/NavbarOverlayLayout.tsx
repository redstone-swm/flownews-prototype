import NavBar from "@/components/layout/NavBar.tsx";

export default function NavbarOverlayLayout({children}: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center min-h-svh">
            <NavBar variant="transparent-fixed"/>
            <main className="flex-1 overflow-y-auto w-screen">
                {children}
            </main>
        </div>
    );
}

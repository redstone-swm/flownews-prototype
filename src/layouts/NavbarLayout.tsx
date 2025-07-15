import NavBar from "@/components/layout/NavBar.tsx";

export default function NavbarLayout({children}: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center min-h-svh">
            <NavBar/>
            <main className="mt-4 flex-1 px-4 overflow-y-auto w-full max-w-screen-xl">
                {children}
            </main>
        </div>
    );
}

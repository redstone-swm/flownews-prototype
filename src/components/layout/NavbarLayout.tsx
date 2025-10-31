import Navbar from "@/components/layout/Navbar.tsx";
import {useGetTopKTopics} from "@/api/topic-list-query-api/topic-list-query-api.ts";

interface NavbarLayoutProps {
    children: React.ReactNode;
}

export default function NavbarLayout({children}: NavbarLayoutProps) {
    const {data: topKTopics, isLoading: topKLoading} = useGetTopKTopics(
        {limit: 5}
    );

    return (
        <div className="flex flex-col items-center min-h-svh mb-4">
            <Navbar topKTopics={topKTopics} topKLoading={topKLoading}/>
            <main className=" flex-1  overflow-y-auto w-full max-w-screen-lg">
                {children}
            </main>
        </div>
    );
}

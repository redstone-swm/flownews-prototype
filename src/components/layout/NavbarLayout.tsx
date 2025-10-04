import Navbar from "@/components/layout/Navbar.tsx";
import type {TopicTopKQueryResponse} from "@/api/models";

interface NavbarLayoutProps {
    children: React.ReactNode;
    topKTopics?: TopicTopKQueryResponse[];
    topKLoading?: boolean;
}

export default function NavbarLayout({children, topKTopics, topKLoading}: NavbarLayoutProps) {
    return (
        <div className="flex flex-col items-center min-h-svh">
            <Navbar topKTopics={topKTopics} topKLoading={topKLoading}/>
            <main className=" flex-1  overflow-y-auto w-full max-w-screen-lg">
                {children}
            </main>
        </div>
    );
}

import {Search} from "lucide-react";
import {Link} from "@tanstack/react-router";
import {Input} from "@/components/ui/input.tsx";


export default function NavBar() {
    return (
        <header className="w-full  sticky top-0 z-50 shadow-sm">
            <div className="max-w-screen-lg mx-auto px-4 py-3 flex gap-8 items-center justify-between">
                <div className="">
                    <Link to="/">
                        <img
                            src="/logo.png"
                            alt="logo"
                            className="h-7 w-auto object-contain dark:hidden"
                        />
                        <img
                            src="/logo-dark.png"
                            alt="logo dark"
                            className="h-7 w-auto object-contain hidden dark:block"
                        />
                    </Link>
                </div>
                <div className="flex flex-grow justify-center w-full">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500"/>
                        <Input
                            type="text"
                            placeholder="검색어를 입력하세요"
                            className="pl-10 rounded-full"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}

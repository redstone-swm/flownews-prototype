import {Search} from "lucide-react";
import {Link} from "@tanstack/react-router";

export default function NavBar() {
    return (
        <header className="w-full bg-white sticky top-0 z-50 shadow-sm">
            <div className="max-w-screen-lg mx-auto px-4 py-3 flex gap-2 items-center justify-between">
                <Link to={"/"}>
                    <div className="w-1/3">
                        <h1 className="text-2xl font-extralight">FlowNews</h1>
                    </div>
                </Link>
                <div className="flex flex-grow lg:w-2/3 lg:justify-center justify-center">
                    <div className="relative w-full max-w-sm">
                        <input
                            type="text"
                            placeholder="검색어를 입력하세요"
                            className="text-sm w-full border border-gray-300 rounded-full pt-1.5 pb-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <Search className="absolute left-3 top-2 h-5 w-5 text-gray-500"/>
                    </div>
                </div>

                <div className="hidden lg:flex  justify-end"/>
            </div>
        </header>
    );
}

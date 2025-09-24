import {Link, useRouter} from "@tanstack/react-router";
import NavbarAvatar from "@/components/layout/NavbarAvatar.tsx";
import {ThemeToggle} from "@/components/ui/theme-toggle";

interface NavBarProps {
    variant?: 'default' | 'transparent-fixed';
}

export default function NavBar({variant = 'default'}: NavBarProps) {
    const router = useRouter();
    const currentPath = router.state.location.pathname;
    const isTopicPage = /^\/topics\/[^\/]+$/.test(currentPath);

    const headerClasses = variant === 'transparent-fixed'
        ? "w-full h-14 bg-transparent backdrop-blur-sm fixed top-0 z-50 border-b border-white/10"
        : "w-full h-14 bg-primary-foreground sticky top-0 z-50 border-b border-gray";

    return (
        <header className={headerClasses}>
            <div
                className={`py-4 h-full mx-auto flex gap-4 items-center justify-between ${variant === 'transparent-fixed' ? 'px-4' : 'px-4 max-w-screen-xl'} `}>
                <div className="">
                    <Link to="/">
                        <img
                            src="/logo.png"
                            alt="logo"
                            className={`h-12 w-auto object-contain ${variant === 'transparent-fixed' ? 'hidden' : 'dark:hidden'}`}
                        />
                        <img
                            src="/logo-dark.png"
                            alt="logo dark"
                            className={`h-12 w-auto object-contain ${variant === 'transparent-fixed' ? 'block' : 'hidden dark:block'}`}
                        />
                    </Link>
                </div>
                <div className="flex flex-grow justify-center w-full">
                    {/*<div className="relative w-full">*/}
                    {/*    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500"/>*/}
                    {/*    <Input*/}
                    {/*        type="text"*/}
                    {/*        placeholder="검색어를 입력하세요"*/}
                    {/*        className="pl-10 rounded-full"*/}
                    {/*    />*/}
                    {/*</div>*/}
                </div>
                <div className={`flex items-center justify-center gap-3`}>
                    {!isTopicPage && <ThemeToggle/>}
                    <NavbarAvatar/>
                </div>
            </div>
        </header>
    );
}

import {LogOut, User} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useAuth} from "@/contexts/AuthContext.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useLoginModal} from "@/contexts/ModalContext.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Link} from "@tanstack/react-router";

export default function NavbarAvatar() {
    const {user, isAuthenticated, isLoading, logout} = useAuth();
    const {open: openLoginModal} = useLoginModal();

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            {isLoading ? (
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
            ) : isAuthenticated && user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="cursor-pointer">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src={user.profileUrl} alt={user.name}/>
                                <AvatarFallback>
                                    {/*{user.name.charAt(0).toUpperCase()}*/}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel className="text-right">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">{user.name}</span>
                                <span className="text-xs text-muted-foreground">{user.email}</span>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <Link to="/profile" className="cursor-pointer">
                            <DropdownMenuItem>
                                <User className="w-4 h-4 mr-2"/>
                                <span>내 정보</span>
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                            <LogOut className="w-4 h-4 mr-2"/>
                            로그아웃
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={openLoginModal}
                >
                    로그인
                </Button>
            )}
        </>
    )
}
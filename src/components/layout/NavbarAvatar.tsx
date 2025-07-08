import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {LogOut} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "@tanstack/react-router";
import {useAuth} from "@/contexts/AuthContext.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export default function NavbarAvatar() {
    const {user, isAuthenticated, isLoading, logout} = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            {isLoading ? (
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
            ) : isAuthenticated && user ? (
                <Popover>
                    <PopoverTrigger asChild className="cursor-pointer">
                        <Avatar className="w-8 h-8">
                            <AvatarImage src={user.profileUrl} alt={user.name}/>
                            <AvatarFallback>
                                {/*{user.name.charAt(0).toUpperCase()}*/}
                            </AvatarFallback>
                        </Avatar>
                    </PopoverTrigger>
                    <PopoverContent align="end">
                        <div className="space-y-3">
                            <div className="border-b pb-3 text-right">
                                <p className="font-medium text-sm">{user.name}</p>
                                <p className="text-xs text-gray-500">{user.email}</p>
                            </div>
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-sm"
                                onClick={handleLogout}
                            >
                                <LogOut className="w-4 h-4 mr-2"/>
                                로그아웃
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
            ) : (
                <Link to="/auth/login">
                    <Button variant="outline" className="rounded-full">
                        로그인
                    </Button>
                </Link>
            )}
        </>
    )
}
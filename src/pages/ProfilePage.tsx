import NavbarLayout from "@/components/layout/NavbarLayout.tsx";
import {Card, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useAuth} from "@/contexts/AuthContext";
import {User} from "lucide-react";
import {DeleteAccountModal} from "@/components/auth/DeleteAccountModal";
import {useState} from "react";
import {useWithdraw} from "@/api/user-profile/user-profile.ts";

export const ProfilePage = () => {
    const {user, isLoading, isAuthenticated, logout} = useAuth();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const userWithdrawMutation = useWithdraw();

    const handleDeleteAccount = () => {
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async (reason: string) => {
        try {
            await userWithdrawMutation.mutateAsync({data: {reason}});
            logout();
            window.location.href = "/";
        } catch (error) {
            console.error("회원탈퇴 처리 중 오류:", error);
            alert("회원탈퇴 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    if (isLoading) return;
    if (!isLoading && !isAuthenticated) {
        window.location.href = "/";
        return;
    }

    return (
        <NavbarLayout>
            <div className="container mx-auto px-4 py-6">
                <Card className="mb-6">
                    <CardHeader className="text-center pb-4">
                        <div className="flex flex-col items-center space-y-4">
                            <Avatar className="w-20 h-20">
                                <AvatarImage src={user?.profileUrl} alt={user?.name}/>
                                <AvatarFallback>
                                    <User className="w-10 h-10"/>
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-xl">{user?.name || "사용자"}</CardTitle>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {user?.email}
                                </p>
                            </div>
                        </div>

                    </CardHeader>
                    <CardFooter>
                        <div className="flex w-full justify-end">
                            <button
                                onClick={handleDeleteAccount}
                                className="text-xs text-muted-foreground "
                            >
                                회원 탈퇴
                            </button>
                        </div>
                    </CardFooter>
                </Card>

                <DeleteAccountModal
                    open={isDeleteModalOpen}
                    onOpenChange={setIsDeleteModalOpen}
                    onConfirm={handleConfirmDelete}
                />
            </div>
        </NavbarLayout>
    );
}
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {useAuth} from "@/contexts/AuthContext.tsx";
import {useGATracking} from "@/hooks/useGATracking.ts";
import {Capacitor} from "@capacitor/core";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton.tsx";

interface LoginModalProps {
    open: boolean;
    onOpenChange?: (open: boolean) => void; // optional로 변경
}

export default function LoginModal({open, onOpenChange}: LoginModalProps) {
    const {isAuthenticated} = useAuth();
    const {trackLoginClick} = useGATracking();

    if (isAuthenticated) {
        onOpenChange?.(false);
        return null;
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="">
                        시점에 오신 것을 환영합니다
                    </DialogTitle>
                    <DialogDescription>
                        로그인하고, 다양한 토픽들을 팔로우하세요!
                        <br/>
                        <strong className="font-semibold text-blue-600">
                            팔로우한 토픽의 후속 기사
                        </strong>
                        를 가장 먼저 받아볼 수 있습니다.
                    </DialogDescription>
                </DialogHeader>


                <div className="">
                    <div className="space-y-3">
                        {/* 구글 로그인/회원가입 버튼 */}
                        <GoogleLoginButton onOpenChange={onOpenChange}/>

                        {/* 애플 로그인/회원가입 버튼 */}
                        {/*<Button*/}
                        {/*    onClick={handleAppleLogin}*/}
                        {/*    className="w-full h-12 text-base font-medium"*/}
                        {/*>*/}
                        {/*    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">*/}
                        {/*        <path*/}
                        {/*            d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z"/>*/}
                        {/*    </svg>*/}
                        {/*    Apple 계정으로 계속하기*/}
                        {/*</Button>*/}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
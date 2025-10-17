import React, {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";

interface DeleteAccountModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: (reason: string) => void;
}

const deleteReasons = [
    "보고 싶은 뉴스가 없어요",
    "잦은 오류가 발생해요",
    "사용하기가 어려워요",
    "기타"
];

export const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
                                                                          open,
                                                                          onOpenChange,
                                                                          onConfirm
                                                                      }) => {
    const [selectedReason, setSelectedReason] = useState<string>("");
    const [customReason, setCustomReason] = useState<string>("");

    const handleConfirm = () => {
        const reasonToSend = selectedReason === "기타" ? customReason : selectedReason;
        if (reasonToSend.trim()) {
            alert("탈퇴가 완료되었습니다.")
            onConfirm(reasonToSend);
            onOpenChange(false);
            setSelectedReason("");
            setCustomReason("");
        }
    };

    const handleCancel = () => {
        onOpenChange(false);
        setSelectedReason("");
        setCustomReason("");
    };

    const isConfirmDisabled = !selectedReason || (selectedReason === "기타" && !customReason.trim());

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>회원 탈퇴</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-muted-foreground mb-4">
                            탈퇴 사유를 선택해주세요. 더 나은 서비스를 위해 소중한 의견을 반영하겠습니다.
                        </p>

                        <p className="text-sm text-red-600 mb-4 font-medium">
                            ⚠️ 탈퇴된 계정으로는 다시 가입할 수 없습니다.
                        </p>

                        <RadioGroup value={selectedReason} onValueChange={setSelectedReason}>
                            {deleteReasons.map((reason) => (
                                <div key={reason} className="flex items-center space-x-2">
                                    <RadioGroupItem value={reason} id={reason}/>
                                    <Label htmlFor={reason} className="text-sm font-normal cursor-pointer">
                                        {reason}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>

                    {selectedReason === "기타" && (
                        <div className="space-y-2">
                            <Label htmlFor="customReason" className="text-sm">
                                자세한 내용을 입력해주세요
                            </Label>
                            <Textarea
                                id="customReason"
                                placeholder="탈퇴 사유를 입력해주세요..."
                                value={customReason}
                                onChange={(e) => setCustomReason(e.target.value)}
                                className="min-h-[100px]"
                            />
                        </div>
                    )}
                </div>

                <DialogFooter className="flex gap-2">
                    <Button variant="outline" onClick={handleCancel}>
                        취소
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleConfirm}
                        disabled={isConfirmDisabled}
                    >
                        탈퇴하기
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

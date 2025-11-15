import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavbarBadge } from "@/components/layout/NavbarBadge";

interface ArticleViewerProps {
  url: string;
  title: string;
  source: string;
  onClose: () => void;
  onBack?: () => void;
}

export function ArticleViewer({ url, title, source, onClose, onBack }: ArticleViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const openInNewTab = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      <div className="fixed inset-0 -z-10 bg-gradient-to-r from-[#323b86] to-[#3f1f76]"/>
      
      {/* Header - 타임라인과 동일한 스타일 */}
      <div className="h-[52px] flex items-center justify-between sticky py-2 pl-3 pr-4">
        <div className="flex items-center">
          <ChevronLeft
            size={27}
            className="mr-1 text-white cursor-pointer hover:opacity-80"
            onClick={onClose}
          />
          <NavbarBadge text={source || "기사"}/>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={openInNewTab} 
            title="새 탭에서 열기"
            className="text-white hover:bg-white/20"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 relative bg-white">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/90">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#323b86] mx-auto mb-2"></div>
              <div className="text-sm text-gray-600">기사를 불러오는 중...</div>
            </div>
          </div>
        )}

        {hasError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <div className="text-center max-w-md mx-auto p-6">
              <div className="text-lg font-semibold mb-2 text-gray-900">기사를 불러올 수 없습니다</div>
              <div className="text-sm text-gray-600 mb-4">
                일부 사이트는 보안 정책으로 인해 프레임 내에서 표시되지 않습니다.
              </div>
              <Button onClick={openInNewTab} className="w-full bg-[#323b86] hover:bg-[#2a2f6e]">
                새 탭에서 열기
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        ) : (
          <iframe
            src={url}
            className={cn("w-full h-full border-0", isLoading && "opacity-0")}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            title={title}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}
      </div>
    </div>
  );
}
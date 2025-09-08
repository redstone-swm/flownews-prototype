import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(count % 1000 === 0 ? 0 : 1)}K`
  }
  return count.toString()
}

export function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString)
    const now = new Date()
    
    // 밀리초 단위 차이
    const diffMs = now.getTime() - date.getTime()
    
    // 음수인 경우 (미래 날짜) 방금전으로 처리
    if (diffMs < 0) {
      return "방금전"
    }
    
    // 시간 단위로 변환
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    
    if (diffHours < 1) {
      return "방금전"
    } else if (diffHours < 24) {
      return `${diffHours}시간전`
    } else {
      const diffDays = Math.floor(diffHours / 24)
      return `${diffDays}일전`
    }
  } catch (error) {
    // 날짜 파싱 에러 시 원본 반환
    return dateString
  }
}

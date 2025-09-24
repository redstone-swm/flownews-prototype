import React, {useState, useRef, useCallback} from 'react'
import {motion, useMotionValue, useTransform, type PanInfo} from 'framer-motion'
import {RefreshCw} from 'lucide-react'
import {cn} from '@/lib/utils'

interface PullToRefreshProps {
    children: React.ReactNode
    onRefresh: () => Promise<void>
    pullDistance?: number
    refreshThreshold?: number
    className?: string
}

export function PullToRefresh({
                                  children,
                                  onRefresh,
                                  pullDistance = 80,
                                  refreshThreshold = 60,
                                  className
                              }: PullToRefreshProps) {
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [isPulling, setIsPulling] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const y = useMotionValue(0)
    const opacity = useTransform(y, [0, refreshThreshold], [0, 1])
    const scale = useTransform(y, [0, refreshThreshold], [0.8, 1])
    const rotate = useTransform(y, [0, pullDistance], [0, 0])

    const handlePanStart = useCallback(() => {
        if (containerRef.current?.scrollTop === 0) {
            setIsPulling(true)
        }
    }, [])

    const handlePanEnd = useCallback(async (_: any, info: PanInfo) => {
        const currentY = y.get()

        if (currentY >= refreshThreshold && !isRefreshing) {
            setIsRefreshing(true)
            try {
                await onRefresh()
            } finally {
                setIsRefreshing(false)
            }
        }

        y.set(0)
        setIsPulling(false)
    }, [y, refreshThreshold, onRefresh, isRefreshing])

    const handlePan = useCallback((_: any, info: PanInfo) => {
        if (!isPulling || containerRef.current?.scrollTop !== 0) return

        const newY = Math.max(0, Math.min(info.offset.y, pullDistance))
        y.set(newY)
    }, [isPulling, y, pullDistance])

    return (
        <div
            ref={containerRef}
            className={cn("relative overflow-hidden h-full", className)}
        >
            {/* Pull to refresh indicator */}
            <motion.div
                className="absolute top-0 left-0 right-0 flex items-center justify-center z-10 bg-background/80 backdrop-blur-sm"
                style={{
                    opacity,
                    scale,
                    height: y,
                }}
            >
                <motion.div
                    className="flex flex-col items-center gap-2 text-muted-foreground"
                    style={{rotate}}
                >
                    <RefreshCw
                        className={cn(
                            "w-5 h-5 transition-all duration-200",
                            isRefreshing && "animate-spin"
                        )}
                    />
                    <span className="text-sm font-medium">
            {isRefreshing ? "새로고침 중..." : "당겨서 새로고침"}
          </span>
                </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
                style={{y}}
                onPanStart={handlePanStart}
                onPan={handlePan}
                onPanEnd={handlePanEnd}
                drag="y"
                dragConstraints={{top: 0, bottom: 0}}
                dragElastic={{top: 0.2, bottom: 0}}
                className="min-h-full"
            >
                {children}
            </motion.div>
        </div>
    )
}

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import {cn} from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

// container prop을 추가하여 포털 마운트 지점을 지정할 수 있게 확장
interface ExtendedTooltipContentProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
    container?: HTMLElement | null
}

const TooltipContent = React.forwardRef<
    React.ElementRef<typeof TooltipPrimitive.Content>,
    ExtendedTooltipContentProps
>(({className, sideOffset = 4, container, ...props}, ref) => (
    <TooltipPrimitive.Portal container={container ?? undefined}>
        <TooltipPrimitive.Content
            ref={ref}
            sideOffset={sideOffset}
            className={cn(
                "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]",
                className
            )}
            {...props}
        />
    </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export {Tooltip, TooltipTrigger, TooltipContent, TooltipProvider}

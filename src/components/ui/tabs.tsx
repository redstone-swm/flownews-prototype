import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import {cva, type VariantProps} from "class-variance-authority"
import {cn} from "@/lib/utils"


const Tabs = TabsPrimitive.Root

const tabsListVariants = cva(
    "inline-flex ",
    {
        variants: {
            variant: {
                default: "items-center justify-center h-10 rounded-md bg-muted p-1 text-muted-foreground",
                outline: "inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0",
                // Add more variants here
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)
const tabsTriggerVariants = cva(
    "inline-flex items-center justify-center",
    {
        variants: {
            variant: {
                default: "whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
                outline: "inline-flex items-center justify-center whitespace-nowrap  text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-3 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none",
                // Add more variants here
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

interface TabsListProps
    extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
        VariantProps<typeof tabsListVariants> {
}

const TabsList = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.List>,
    TabsListProps
>(({className, variant, ...props}, ref) => (
    <TabsPrimitive.List
        ref={ref}
        className={cn(tabsListVariants({variant, className}))}
        {...props}
    />
))
TabsList.displayName = TabsPrimitive.List.displayName

interface TabsTriggerProps
    extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
        VariantProps<typeof tabsTriggerVariants> {
}

const TabsTrigger = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>,
    TabsTriggerProps
>(({className, variant, ...props}, ref) => (
    <TabsPrimitive.Trigger
        ref={ref}
        className={cn(tabsTriggerVariants({variant, className}))}
        {...props}
    />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName


const TabsContent = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({className, ...props}, ref) => (
    <TabsPrimitive.Content
        ref={ref}
        className={cn(
            "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className
        )}
        {...props}
    />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export {Tabs, TabsList, TabsTrigger, TabsContent}
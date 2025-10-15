import {createRootRoute, Outlet} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools'
import {usePageTracking} from "@/hooks/usePageTracking";
import AppUrlListener from "@/lib/scheme-listener.ts";
import {Toaster} from "@/components/ui/sonner.tsx";


export const Route = createRootRoute({
    component: () => {
        // usePageTracking();

        return (
            <>
                <Toaster/>
                <AppUrlListener/>
                <Outlet/>
                <TanStackRouterDevtools/>
            </>
        );
    },
});
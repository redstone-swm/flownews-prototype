import {createRootRoute, Outlet} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools'
import {usePageTracking} from "@/hooks/usePageTracking";
import AppUrlListener from "@/lib/scheme-listener.ts";

export const Route = createRootRoute({
    component: () => {
        usePageTracking();

        return (
            <>
                <AppUrlListener/>
                <Outlet/>
                <TanStackRouterDevtools/>
            </>
        );
    },
});
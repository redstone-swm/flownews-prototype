import {createRootRoute, Outlet} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools'
import NavBar from "@/components/layout/NavBar.tsx";
import {usePageTracking} from "@/hooks/usePageTracking";

export const Route = createRootRoute({
    component: () => {
        usePageTracking();

        return (
            <>
                <NavBar/>
                <div className="mt-5">
                    <Outlet/>
                </div>
                <TanStackRouterDevtools/>
            </>
        );
    },
});
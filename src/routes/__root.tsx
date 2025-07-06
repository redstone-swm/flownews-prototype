import {createRootRoute, Outlet} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools'
import NavBar from "@/components/layout/NavBar.tsx";
import {AuthProvider} from "@/contexts/AuthContext";

export const Route = createRootRoute({
    component: () => (
        <>
            <NavBar/>
            <div className="mt-5">
                <Outlet/>
            </div>
            <TanStackRouterDevtools/>
        </>
    ),
})

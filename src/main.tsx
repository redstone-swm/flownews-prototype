import {StrictMode, useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider, createRouter} from '@tanstack/react-router'

// Import the generated route tree
import {routeTree} from './routeTree.gen'

import './styles.css'
import reportWebVitals from './reportWebVitals.ts'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {AuthProvider} from "@/contexts/AuthContext.tsx";
import {LoginModalProvider} from "@/contexts/ModalContext.tsx";
import {configureStatusBar} from "@/lib/status-bar.ts";

// Create a new router instance
const router = createRouter({
    routeTree,
    context: {},
    defaultPreload: 'intent',
    scrollRestoration: true,
    defaultStructuralSharing: true,
    defaultPreloadStaleTime: 0,
})

// Create a queryClient
const queryClient = new QueryClient()

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
    router: typeof router
    }
}

// App component with status bar initialization
function App() {
    useEffect(() => {
        configureStatusBar();
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <LoginModalProvider>
                    <ThemeProvider defaultTheme="light">
                        <RouterProvider router={router}/>
                    </ThemeProvider>
                </LoginModalProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
}

// Render the app
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <App />
        </StrictMode>,
    )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

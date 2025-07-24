import type {Preview, StoryFn} from '@storybook/react-vite';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {
    createRouter,
    createMemoryHistory,
    RouterProvider,
    createRootRoute,
} from "@tanstack/react-router";
import {AuthProvider} from "@/contexts/AuthContext.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";

const queryClient = new QueryClient();
const RouterDecorator = (Story: StoryFn) => {
    const rootRoute = createRootRoute({component: () => <Story/>});
    const routeTree = rootRoute;

    const router = createRouter({
        routeTree,
        history: createMemoryHistory(),
    });

    return <RouterProvider router={router}/>;
};


const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },

        a11y: {
            // 'todo' - show a11y violations in the test UI only
            // 'error' - fail CI on a11y violations
            // 'off' - skip a11y checks entirely
            test: 'todo'
        }
    },
    decorators: [
        (Story) => (
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <ThemeProvider defaultTheme="light">
                        {RouterDecorator(Story)}
                    </ThemeProvider>
                </AuthProvider>
            </QueryClientProvider>
        )]
};

export default preview;
import type { Meta, StoryObj } from "@storybook/react";
import {
  createRouter,
  createMemoryHistory,
  RouterProvider,
  createRootRoute,
} from "@tanstack/react-router";
import "../styles.css";
// 1. Import QueryClient and QueryClientProvider
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/theme-provider";
import { StrictMode } from "react";

// 2. Create a new instance of QueryClient
const queryClient = new QueryClient();

const meta = {
  title: "Sijeom/Button",
  component: Button,
  parameters: {},
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      const rootRoute = createRootRoute({
        component: Story,
      });

      const routeTree = rootRoute.addChildren([]);

      const router = createRouter({
        routeTree,
        history: createMemoryHistory(),
      });

      // 3. Wrap everything in the QueryClientProvider
      return (
        <StrictMode>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <ThemeProvider defaultTheme="light">
                <RouterProvider router={router} />
              </ThemeProvider>
            </AuthProvider>
          </QueryClientProvider>
        </StrictMode>
      );
    },
  ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    size: "default",
    children: "Default",
  },
};

export const RoundedFull: Story = {
  args: {
    variant: "outline",
    size: "default",
    rounded: true,
    children: "RoundedFull",
  },
};

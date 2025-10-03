import type {Meta, StoryObj} from "@storybook/react";
import '../styles.css'
import Navbar from "@/components/layout/Navbar.tsx";

const meta = {
    title: "Sijeom/NavBar",
    component: Navbar,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        variant: "default",
    },
};
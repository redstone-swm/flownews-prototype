import type {Meta, StoryObj} from "@storybook/react";
import '../styles.css'
import NavBar from "@/components/layout/NavBar";

const meta = {
    title: "Sijeom/NavBar",
    component: NavBar,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof NavBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        variant: "default",
    },
};
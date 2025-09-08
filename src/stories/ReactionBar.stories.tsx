import type { Meta, StoryObj } from "@storybook/react"
import "../styles.css"
import { ReactionBar, type ReactionsProps } from "@/components/ui/reaction-bar"

const meta: Meta<typeof ReactionBar> = {
  title: "Sijeom/ReactionBar",
  component: ReactionBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    reactions: {
      control: "object",
      description: "반응 데이터",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const defaultReactions: ReactionsProps = {
  heartCount: 1000,
  angryCount: 1000,
  sadCount: 1000,
  activeReaction: null,
  isBookmarked: false,
}

export const Default: Story = {
  args: {
    reactions: defaultReactions,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md bg-white border rounded-lg overflow-hidden">
        <Story />
      </div>
    ),
  ],
}

export const WithActiveHeart: Story = {
  args: {
    reactions: {
      ...defaultReactions,
      activeReaction: "heart",
    },
  },
  decorators: Default.decorators,
}

export const WithBookmark: Story = {
  args: {
    reactions: {
      ...defaultReactions,
      isBookmarked: true,
    },
  },
  decorators: Default.decorators,
}

export const LargeNumbers: Story = {
  args: {
    reactions: {
      heartCount: 25300,
      angryCount: 8750,
      sadCount: 15200,
      activeReaction: "heart",
      isBookmarked: true,
    },
  },
  decorators: Default.decorators,
}

export const SmallNumbers: Story = {
  args: {
    reactions: {
      heartCount: 42,
      angryCount: 7,
      sadCount: 15,
      activeReaction: null,
      isBookmarked: false,
    },
  },
  decorators: Default.decorators,
}

export const ZeroCounts: Story = {
  args: {
    reactions: {
      heartCount: 0,
      angryCount: 0,
      sadCount: 0,
      activeReaction: null,
      isBookmarked: false,
    },
  },
  decorators: Default.decorators,
}
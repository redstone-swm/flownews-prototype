import type {Meta, StoryObj} from "@storybook/react"
import "../styles.css"
import {ReactionBar, type ReactionBarProps} from "@/components/feed/ReactionBar.tsx"
import type {ReactionSummaryResponse} from "@/api/models"

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

const defaultReactions: ReactionSummaryResponse[] = [
    {
        reactionTypeId: 1,
        reactionTypeName: "HEART",
        count: 1000,
        isActive: false
    }
]

export const Default: Story = {
    args: {
        eventId: 1,
        topicId: 1,
        isFollowing: false,
        reactions: defaultReactions,
    },
    decorators: [
        (Story) => (
            <div className="w-full max-w-md bg-white border rounded-lg overflow-hidden">
                <Story/>
            </div>
        ),
    ],
}

export const WithActiveHeart: Story = {
    args: {
        eventId: 1,
        topicId: 1,
        isFollowing: false,
        reactions: [
            {
                reactionTypeId: 1,
                reactionTypeName: "HEART",
                count: 1000,
                isActive: true
            }
        ],
    },
    decorators: Default.decorators,
}

export const LargeNumbers: Story = {
    args: {
        eventId: 1,
        topicId: 1,
        isFollowing: false,
        reactions: [
            {
                reactionTypeId: 1,
                reactionTypeName: "HEART",
                count: 25300,
                isActive: true
            }
        ],
    },
    decorators: Default.decorators,
}

export const SmallNumbers: Story = {
    args: {
        eventId: 1,
        topicId: 1,
        isFollowing: false,
        reactions: [
            {
                reactionTypeId: 1,
                reactionTypeName: "HEART",
                count: 42,
                isActive: false
            }
        ],
    },
    decorators: Default.decorators,
}

export const ZeroCounts: Story = {
    args: {
        eventId: 1,
        topicId: 1,
        isFollowing: false,
        reactions: [
            {
                reactionTypeId: 1,
                reactionTypeName: "HEART",
                count: 0,
                isActive: false
            }
        ],
    },
    decorators: Default.decorators,
}
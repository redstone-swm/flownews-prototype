import {createFileRoute} from '@tanstack/react-router'
import FeedPageMain from "@/pages/FeedPageMain.tsx";

export const Route = createFileRoute('/')({
    component: FeedPageMain,
})


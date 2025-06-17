import {createFileRoute} from '@tanstack/react-router'
import MainPage from "@/pages/MainPage.tsx";

export const Route = createFileRoute('/')({
    component: MainPage,
})


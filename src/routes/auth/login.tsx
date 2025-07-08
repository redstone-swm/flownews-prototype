import {createFileRoute} from '@tanstack/react-router'
import LoginPage from "@/pages/LoginPage.tsx";

export const Route = createFileRoute('/auth/login')({
    component: LoginPage,
})
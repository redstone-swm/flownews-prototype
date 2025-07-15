import {Moon, Sun} from "lucide-react"
import {Button} from "./button"
import {useTheme} from "../theme-provider"

export function ThemeToggle() {
    const {theme, setTheme} = useTheme()

    const toggleTheme = () => {
        if (theme === "light") {
            setTheme("dark")
        } else if (theme === "dark") {
            setTheme("light")
        } else {
            // system mode일 때는 light로 설정
            setTheme("light")
        }
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9 hover:bg-transparent"
        >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
            <span className="sr-only">테마 전환</span>
        </Button>
    )
}

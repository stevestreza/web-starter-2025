import { Outlet } from "react-router";
import ThemeToggle from "./ThemeToggle";

export default function Layout() {
	return (
		<div className="flex min-h-screen bg-background dark:bg-background-dark text-text-primary dark:text-text-primary-dark">
			<header className="fixed top-0 left-0 right-0 h-16 bg-surface dark:bg-surface-dark border-b border-border dark:border-border-dark z-10">
				<div className="flex items-center justify-end h-full px-6">
					<ThemeToggle />
				</div>
			</header>
			<main className="flex-1 p-6 md:ml-64 mt-16 bg-background dark:bg-background-dark">
				<Outlet />
			</main>
		</div>
	)
}

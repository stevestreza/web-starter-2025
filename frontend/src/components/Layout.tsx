import { Outlet } from "react-router";

export default function Layout() {
	return (
		<div className="flex min-h-screen">
			<main className="flex-1 p-6 md:ml-64 mt-16 bg-space-500">
				<Outlet />
			</main>
		</div>
	)
}

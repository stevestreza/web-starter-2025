import { Outlet } from "react-router";

const Layout = () => {
	return (
		<div class="flex min-h-screen">
			<main class="flex-1 p-6 md:ml-64 mt-16 bg-space-500">
				<Outlet />
			</main>
		</div>
	)
}

export default Layout

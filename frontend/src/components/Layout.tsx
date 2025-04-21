import { ParentProps, createSignal } from 'solid-js'

const Layout = (props: ParentProps) => {
	return (
		<div class="flex min-h-screen">
			<main class="flex-1 p-6 md:ml-64 mt-16 bg-space-500">
				{props.children}
			</main>
		</div>
	)
}

export default Layout

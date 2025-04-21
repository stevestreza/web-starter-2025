import { Route, Router } from '@solidjs/router';
import { lazy, Suspense } from 'solid-js';
import Layout from './components/Layout';

const Home = lazy(() => import(`./pages/Home`));
const About = lazy(() => import(`./pages/About`));

function App() {
	return (
		<div class="min-h-screen bg-space-600">
			<Router root={Layout}>
				<Suspense fallback={<div class="text-nebula-purple-200 p-6">Loading...</div>}>
					<Route path="/" component={Home} />
					<Route path="/about" component={About} />
				</Suspense>
			</Router>
		</div>
	);
}

export default App;

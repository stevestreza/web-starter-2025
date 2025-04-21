import { Route, Routes } from 'react-router';
import Layout from './components/Layout';

import Home from "./pages/Home";
import About from "./pages/About";

function App() {
	return (
		<Routes root={Layout}>
			<Route index component={<Home />} />
			<Route path="about" component={<About />} />
		</Routes>
	);
}

export default App;

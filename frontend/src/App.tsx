import { Route, Routes } from 'react-router';

import Layout from './components/Layout';
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
	return (
		<Routes element={<Layout />}>
			<Route index element={<Home />} />
			<Route path="about" element={<About />} />
		</Routes>
	);
}

export default App;

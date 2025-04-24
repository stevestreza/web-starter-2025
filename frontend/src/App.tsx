import { Route, Routes } from 'react-router';
import { ThemeProvider } from './contexts/ThemeContext';

import Layout from './components/Layout';
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
	return (
		<ThemeProvider>
			<Routes>
				<Route element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="about" element={<About />} />
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
				</Route>
			</Routes>
		</ThemeProvider>
	);
}

export default App;

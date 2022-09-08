import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Completed from './pages/Completed';
import MainContext from './MainContext';

function App() {
	const [ refresh, setRefresh ] = useState(false);
	const [ list, setList ] = useState(() => JSON.parse(localStorage.getItem('tasks')) || []);
	const [ done, setDone ] = useState(false);
	const contextValues = { refresh, setRefresh, list, setList, setDone, done };
	return (
		<div className="App">
			<BrowserRouter>
				<MainContext.Provider value={contextValues}>
					<Header />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/completed" element={<Completed />} />
					</Routes>
				</MainContext.Provider>
			</BrowserRouter>
		</div>
	);
}

export default App;

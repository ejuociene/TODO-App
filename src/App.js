import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Sidebar/Sidebar';
import Home from './pages/Home';
import Completed from './pages/Completed';
import Settings from './pages/Settings';
import MainContext from './MainContext';

function App() {
	const [ refresh, setRefresh ] = useState(false);
	const [ list, setList ] = useState(() => JSON.parse(localStorage.getItem('tasks')) || []);
	const [ doneList, setDoneList ] = useState(() => JSON.parse(localStorage.getItem('doneTasks')) || []);
	const contextValues = { refresh, setRefresh, list, setList, doneList, setDoneList };
	return (
		<div className="App">
			<BrowserRouter>
				<MainContext.Provider value={contextValues}>
					<Header />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/completed" element={<Completed />} />
						<Route path="/settings" element={<Settings />} />
					</Routes>
				</MainContext.Provider>
			</BrowserRouter>
		</div>
	);
}

export default App;

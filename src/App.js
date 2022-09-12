import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.js';
import ToDo from './pages/ToDo';
import Completed from './pages/Completed';
import Settings from './pages/Settings';
import MainContext from './MainContext';

function App() {
	const [ isDarkTheme, setIsDarkTheme ] = useState(false);
	const [ list, setList ] = useState(() => JSON.parse(localStorage.getItem('tasks')) || []);
	const [ doneList, setDoneList ] = useState(() => JSON.parse(localStorage.getItem('doneTasks')) || []);
	const [ filteredList, setFilteredList ] = useState(() => JSON.parse(localStorage.getItem('tasks')) || []);
	const [ chosenCategory, setChosenCategory ] = useState('');
	const [ categories, setCategories ] = useState(
		() => JSON.parse(localStorage.getItem('categories')) || [ 'Personal', 'Home', 'Work' ]
	);
	useEffect(
		() => {
			localStorage.setItem('categories', JSON.stringify(categories));
		},
		[ categories ]
	);
	useEffect(() => {});
	document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
	const contextValues = {
		isDarkTheme,
		setIsDarkTheme,
		list,
		setList,
		doneList,
		setDoneList,
		categories,
		setCategories,
		filteredList,
		setFilteredList,
		chosenCategory,
		setChosenCategory
	};
	return (
		<div className="App" data-theme={isDarkTheme ? 'dark' : 'light'}>
			<BrowserRouter>
				<MainContext.Provider value={contextValues}>
					<Header />
					<Routes>
						<Route path="/" element={<ToDo />} />
						<Route path="/completed" element={<Completed />} />
						<Route path="/settings" element={<Settings />} />
					</Routes>
				</MainContext.Provider>
			</BrowserRouter>
		</div>
	);
}

export default App;

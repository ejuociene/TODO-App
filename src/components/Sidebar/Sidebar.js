import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import todo from '../../images/todo.svg';
import Done from '../../images/done.svg';
import Settings from '../../images/settings.svg';
import MainContext from '../../MainContext';
import { nanoid } from 'nanoid';
import collapseIcon from '../../images/collapse.svg';
import expandIcon from '../../images/expand.svg';

const Header = () => {
	const { categories, setChosenCategory, setFilteredList } = useContext(MainContext);
	const [ windowWidth, setWindowWidth ] = useState(window.innerWidth);
	const [ fullSidebar, setFullSidebar ] = useState(windowWidth > '786' ? true : false);
	const selectCategory = (category) => {
		setChosenCategory(category);
		console.log(category);
		const alltasks = JSON.parse(localStorage.getItem('tasks'));
		const filtered = alltasks.filter((task) => {
			return task.category === category;
		});
		setFilteredList(filtered);
	};
	console.log(windowWidth);
	return (
		<div className={fullSidebar ? 'sidebar' : 'sidebar-collapsed'}>
			<Link to={'/'} className="link" onClick={() => setChosenCategory('')}>
				<div className="logo-container">
					{fullSidebar && <div className="logo">.ToDo</div>}
					<img
						src={fullSidebar ? collapseIcon : expandIcon}
						alt="move sidebar"
						className="sidebar-icon"
						onClick={() => setFullSidebar((prevState) => !prevState)}
					/>
				</div>
			</Link>
			<nav className="nav">
				<ul className="nav--list">
					{fullSidebar && 'My Tasks'}
					<Link to={'/'} className="link" onClick={() => setChosenCategory('')}>
						<li className={fullSidebar ? 'nav--item' : 'nav--item-collapsed'}>
							<img src={todo} alt="todo" className="nav--icon" />
							{fullSidebar && 'ToDo List'}
						</li>
					</Link>
					<ul className="nav--sublist">
						{fullSidebar &&
							categories.map((category) => {
								return (
									<Link to={'/'} key={nanoid()} className="link">
										<li className="nav--subitem" onClick={() => selectCategory(category)}>
											{category}
										</li>
									</Link>
								);
							})}
					</ul>
					<Link to={'/completed'} className="link">
						<li className={fullSidebar ? 'nav--item' : 'nav--item-collapsed'}>
							<img src={Done} alt="done" className="nav--icon" />
							{fullSidebar && 'Completed'}
						</li>
					</Link>
					<Link to={'/settings'} className="link last">
						<li className={fullSidebar ? 'nav--item' : 'nav--item-collapsed'}>
							<img src={Settings} alt="done" className="nav--icon" />
							{fullSidebar && 'Settings'}
						</li>
					</Link>
				</ul>
			</nav>
		</div>
	);
};

export default Header;

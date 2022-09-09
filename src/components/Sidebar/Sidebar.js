import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import todo from '../../images/todo.svg';
import Done from '../../images/done.svg';
import Settings from '../../images/settings.svg';
import MainContext from '../../MainContext';
import { nanoid } from 'nanoid';

const Header = () => {
	const { categories, setChosenCategory, setFilteredList } = useContext(MainContext);
	const selectCategory = (category) => {
		setChosenCategory(category);
		console.log(category);
		const alltasks = JSON.parse(localStorage.getItem('tasks'));
		const filtered = alltasks.filter((task) => {
			return task.category === category;
		});
		setFilteredList(filtered);
	};
	return (
		<div className="header">
			<Link to={'/'} className="link" onClick={() => setChosenCategory('')}>
				<div className="logo">.ToDo</div>
			</Link>
			<nav className="nav">
				<ul className="nav--list">
					My Tasks:
					<Link to={'/'} className="link" onClick={() => setChosenCategory('')}>
						<li className="nav--item">
							<img src={todo} alt="todo" className="nav--icon" />
							ToDo List
						</li>
					</Link>
					<ul className="nav--sublist">
						{categories.map((category) => {
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
						<li className="nav--item">
							<img src={Done} alt="done" className="nav--icon" />Completed
						</li>
					</Link>
					<Link to={'/settings'} className="link last">
						<li className="nav--item">
							<img src={Settings} alt="done" className="nav--icon" />Settings
						</li>
					</Link>
				</ul>
			</nav>
		</div>
	);
};

export default Header;

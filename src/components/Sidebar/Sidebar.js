import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import todo from '../../images/todo.svg';
import Done from '../../images/done.svg';
import MainContext from '../../MainContext';

const Header = () => {
	return (
		<div className="header">
			<Link to={'/'} className="link">
				<div className="logo">.ToDo</div>
			</Link>
			<nav className="nav">
				<ul className="nav--list">
					My Tasks:
					<Link to={'/'} className="link">
						<li className="nav--item">
							<img src={todo} alt="todo" className="nav--icon" />
							ToDo List
						</li>
					</Link>
					<Link to={'/completed'} className="link">
						<li className="nav--item">
							<img src={Done} alt="done" className="nav--icon" />Completed
						</li>
					</Link>
					<Link to={'/settings'} className="link">
						<li className="nav--item">
							<img src={Done} alt="done" className="nav--icon" />Completed
						</li>
					</Link>
				</ul>
			</nav>
		</div>
	);
};

export default Header;

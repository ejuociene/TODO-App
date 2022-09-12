import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import todo from '../../images/todo.svg';
import Done from '../../images/done.svg';
import Settings from '../../images/settings.svg';

const Header = () => {
	const [ isActiveTab, setIsActiveTab ] = useState('todo');
	return (
		<div className="header">
			<Link to={'/'} className="logo-link" onClick={() => setIsActiveTab('todo')}>
				<div className="logo">.ToDo</div>
			</Link>
			<nav className="nav">
				<ul className="nav--list">
					<Link to={'/'} className="link" onClick={() => setIsActiveTab('todo')}>
						<li className={isActiveTab === 'todo' ? 'nav--item active' : 'nav--item'}>
							<img src={todo} alt="todo" className="nav--icon" />
							ToDo list
						</li>
					</Link>
					<Link to={'/completed'} className="link" onClick={() => setIsActiveTab('completed')}>
						<li className={isActiveTab === 'completed' ? 'nav--item active' : 'nav--item'}>
							<img src={Done} alt="done" className="nav--icon" />
							Completed
						</li>
					</Link>
					<Link to={'/settings'} className="link" onClick={() => setIsActiveTab('settings')}>
						<li className={isActiveTab === 'settings' ? 'nav--item active' : 'nav--item'}>
							<img src={Settings} alt="done" className="nav--icon" />
							Settings
						</li>
					</Link>
				</ul>
			</nav>
		</div>
	);
};

export default Header;

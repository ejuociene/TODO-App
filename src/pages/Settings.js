import React from 'react';
import { useState, useContext } from 'react';
import MainContext from '../MainContext.js';
import { nanoid } from 'nanoid';
import deleteImg from '../images/delete.svg';

const Home = () => {
	const { isDarkTheme, setIsDarkTheme, categories, setCategories } = useContext(MainContext);
	const [ editCategories, setEditCategories ] = useState(false);
	const [ newCategory, setNewCategory ] = useState('');
	const saveNew = () => {
		newCategory && setCategories((prevList) => [ ...prevList, newCategory ]);
		setNewCategory('');
		setEditCategories(false);
	};
	const deleteCategory = (category) => {
		setCategories((prevList) =>
			prevList.filter((each) => {
				return each !== category;
			})
		);
	};
	return (
		<main className="container">
			<div className="heading">
				<h1 className="title">Settings:</h1>
			</div>
			<div className="settings-item">
				<h3 className="sub-title">Your Categories:</h3>
				<ul className="settings-list">
					{categories.map((category) => {
						return (
							<li key={nanoid()} className="sub-item">
								{category}
								{editCategories && (
									<div className="delete-icon-cont">
										<img
											src={deleteImg}
											alt="delete"
											className="delete-icon"
											onClick={() => deleteCategory(category)}
										/>
									</div>
								)}
							</li>
						);
					})}
					{editCategories && (
						<input
							type="text"
							name="newCategory"
							placeholder="Add new Category"
							className="input-category"
							onChange={(e) => setNewCategory(e.target.value)}
						/>
					)}
				</ul>
				{editCategories ? (
					<button className="btn" onClick={() => saveNew()}>
						SAVE
					</button>
				) : (
					<button className="btn" onClick={() => setEditCategories(true)}>
						EDIT CATEGORIES
					</button>
				)}
			</div>
			<div className="settings-switch">
				<h3 className="sub-title">Switch to {isDarkTheme ? 'Light Mode' : 'Dark Mode'} :</h3>
				<label className="switch">
					<input type="checkbox" onChange={() => setIsDarkTheme((prevState) => !prevState)} />
					<span className="slider round" />
				</label>
			</div>
		</main>
	);
};

export default Home;

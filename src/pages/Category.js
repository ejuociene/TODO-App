import React from 'react';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import Task from '../components/Tasks/Task.js';
import MainContext from '../MainContext.js';
import { nanoid } from 'nanoid';

const Category = () => {
	const { list, filteredList, setList, categories } = useContext(MainContext);
	const [ addNew, setAddNew ] = useState(false);
	const [ newTask, setNewTask ] = useState({
		id: nanoid(),
		taskName: '',
		category: 'none'
	});
	useEffect(
		() => {
			localStorage.setItem('tasks', JSON.stringify(list));
		},
		[ list ]
	);
	const handleChange = (e) => {
		setNewTask((prevData) => {
			return {
				...prevData,
				[e.target.name]: e.target.value
			};
		});
	};
	const saveNewTask = (e) => {
		e.preventDefault();
		setList((prevList) => [ newTask, ...prevList ]);
		setNewTask({
			id: nanoid(),
			category: 'none'
		});
		setAddNew(false);
	};
	return (
		<div className="container">
			<div className="heading">
				<h1 className="title">ToDo List:</h1>
				<p className="add" onClick={() => setAddNew(true)}>
					+ New
				</p>
			</div>
			<div className="task--list">
				{addNew && (
					<form className="new-task" onSubmit={(e) => saveNewTask(e)}>
						<div className="task--icon" />
						<div className="task--info">
							<input
								type="text"
								className="input-name"
								placeholder="Task name"
								name="taskName"
								onChange={(e) => handleChange(e)}
							/>
							<select
								className="select-category"
								defaultValue={'default'}
								name="category"
								onChange={(e) => handleChange(e)}
							>
								<option value="default" disabled>
									-Select category-
								</option>
								{categories.map((category) => {
									return <option value={category}>{category}</option>;
								})}
							</select>
						</div>
						<button className="btn">ADD</button>
					</form>
				)}

				{list.length > 0 &&
					list.map((task) => {
						return <Task task={task} key={task.id} />;
					})}
			</div>
		</div>
	);
};

export default Category;

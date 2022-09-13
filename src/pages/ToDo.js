import React from 'react';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import Task from '../components/Tasks/Task.js';
import MainContext from '../MainContext.js';
import { nanoid } from 'nanoid';
import filter from "../images/filter.svg"

const Home = () => {
	const { list, setList, categories, filteredList, setFilteredList, chosenCategory, setChosenCategory } = useContext(MainContext);
	const [ addNew, setAddNew ] = useState(false);
	const [showFilter, setShowFilter] = useState(false)
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
		newTask.category === chosenCategory && setFilteredList((prevList) => [newTask, ...prevList])
		setAddNew((prevStatus => !prevStatus));
	};
	const selectCategory = (value) => {
		if (value === "all") {
		setChosenCategory("")
		return setFilteredList([]); 
	}
	else {
		setChosenCategory(value);
	const alltasks = JSON.parse(localStorage.getItem('tasks'));
	const filtered = alltasks.filter((task) => {
		return task.category === value;
	});
	setFilteredList(filtered)}
	};
	console.log(filteredList)
	return (
		<main className="container">
			<div className="heading">
				<h1 className="title">ToDo List:</h1>
				<div className='heading-tools'>
				{list.length > 0 && <div className='filter-container'>
					{showFilter && <select className='filter-select' defaultValue="default"  onChange={(e) => selectCategory(e.target.value)}>
					<option value="default" disabled>
									- Category -
								</option>
								{categories.map((category) => {
									return <option value={category} key={category}>{category}</option>
								})}
								<option value="all">Show all</option>
							</select>}
						<div className='filter-icon-container'>
							<img src={filter} alt="filter" className='filter-icon' onClick={()=> setShowFilter((prevState) => !prevState)}/>
						</div>
					</div>}
				<p className="add" onClick={() => setAddNew((prevStatus => !prevStatus))}>
					{addNew ? "-" : "+"} New
				</p>
				</div>
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
								defaultValue='default'
								name="category"
								onChange={(e) => handleChange(e)}
							>
								<option value="default" disabled>
									-Select category-
								</option>
								{categories.map((category) => {
									return <option value={category} key={category}>{category}</option>;
								})}
							</select>
						</div>
						<button className="btn">ADD</button>
					</form>
				)}

				{!chosenCategory && (list.length > 0 ? 
					(<>
					{list.map((task) => {
					return <Task task={task} key={task.id} />})}
					</>)
					: 
					 (!addNew && <div className='empty'>No tasks yet. Click <span className='bold'>+ New </span> to add a task</div>))}
				{chosenCategory && (filteredList.length > 0 ? 
				(<>
				{filteredList.map((task) => {
					return <Task task={task} key={task.id} />})}</>)
					:
					(!addNew && <div className="empty">No tasks in this category yet</div>))}
			
			
			</div>
			{addNew && <p className='small-text'>You can edit your categories in the Settings tab</p>}
		</main>
	);
};

export default Home;

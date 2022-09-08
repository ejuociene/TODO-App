import { useState, useEffect } from 'react';
import axios from 'axios';

const Task = (props) => {
	const { task, setRefresh, setMessage } = props;
	const [ edit, setEdit ] = useState(false);
	const [ formData, setFormData ] = useState({
		taskName: task.taskName,
		category: task.category,
		status: 'todo'
	});
	const clickDone = (id) => {
		axios.put(`/api/todos/done/${id}`).then((resp) => {
			setTimeout(() => {
				setRefresh((prevStatus) => {
					return !prevStatus;
				}, 100);
			});
		});
	};
	const handleChange = (e) => {
		setFormData((prevData) => {
			return {
				...prevData,
				[e.target.name]: e.target.value
			};
		});
	};
	const handleEdit = (id) => {
		setEdit((prevStatus) => !prevStatus);
	};
	const saveTask = (e, id) => {
		e.preventDefault();
		axios.put(`/api/todos/${id}`, formData).then((resp) => {
			setRefresh((prevStatus) => !prevStatus);
			setEdit(false);
	
		});
	};
	return (
		<>
			{edit ? (
				<form className="new-task" onSubmit={(e) => saveTask(e, task.id)}>
					<div className="task--icon" />
					<div className="task--info">
						<input
							type="text"
							className="input-name"
							placeholder="Task name"
							name="taskName"
							onChange={(e) => handleChange(e)}
							value={formData.taskName}
						/>
						<select
							className="select-category"
							defaultValue={formData.category}
							name="category"
							onChange={(e) => handleChange(e)}
						>
							<option value="default" disabled>
								-Select category-
							</option>
							<option value="Home">Home</option>
							<option value="Personal">Personal</option>
							<option value="Work">Work</option>
						</select>
					</div>
					<button className="btn">SAVE</button>
				</form>
			) : (
				<div className="task--card">
					<div className="task--icon" onClick={() => clickDone(task.id)} />
					<div className="task--info">
						<h1 className="task--name">{task.taskName}</h1>
						<p className="task--category">{task.category}</p>
					</div>
					<button className="btn" onClick={() => handleEdit(task.id)}>
						EDIT
					</button>
				</div>
			)}
		</>
	);
};

export default Task;

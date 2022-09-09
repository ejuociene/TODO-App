import { useState, useEffect } from 'react';
import { useContext } from 'react';
import MainContext from '../../MainContext';

const Task = (props) => {
	const {task} = props
	const { list, setList, setDoneList, doneList } = useContext(MainContext);
	const [ edit, setEdit ] = useState(false);
	const [ editedTask, setEditedTask ] = useState({
		id: task.id,
		taskName: task.taskName,
		category: task.category
	});
	useEffect(
		() => {
			localStorage.setItem('doneTasks', JSON.stringify(doneList));
		},
		[ doneList ]
	);
	const clickDone = (id) => {
		setList(oldList => oldList.filter(task => {
            return task.id !== id
        }))
		setDoneList((prevList) => [task, ...prevList ]);
	}
        
	const handleChange = (e) => {
		setEditedTask((prevData) => {
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
							value={editedTask.taskName}
						/>
						<select
							className="select-category"
							defaultValue={editedTask.category}
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
					<div className="task--icon" onClick={(id) => clickDone(task.id)} />
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

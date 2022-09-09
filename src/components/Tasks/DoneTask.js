import { useEffect } from 'react';
import { useContext } from 'react';
import MainContext from '../../MainContext';

const DoneTask = (props) => {
	const { task } = props;
	const { setDoneList, doneList } = useContext(MainContext);
	useEffect(
		() => {
			localStorage.setItem('doneTasks', JSON.stringify(doneList));
		},
		[ doneList ]
	);
	const handleRemove = (id) => {
		setDoneList((prevList) =>
			prevList.filter((task) => {
				return task.id !== id;
			})
		);
	};
	return (
		<div className="task--card">
			<div className="task--info">
				<h1 className="task--name">{task.taskName}</h1>
				<p className="task--category">{task.category}</p>
			</div>
			<button className="btn" onClick={() => handleRemove(task.id)}>
				REMOVE
			</button>
		</div>
	);
};

export default DoneTask;

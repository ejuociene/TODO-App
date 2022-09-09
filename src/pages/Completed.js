import React from 'react';
import { useState, useContext } from 'react';
import DoneTask from '../components/Tasks/DoneTask.js';
import MainContext from '../MainContext.js';

const Home = () => {
	const { doneList } = useContext(MainContext);
	return (
		<div className="container">
			<div className="heading">
				<h1 className="title">Completed Tasks:</h1>
			</div>
			<div className="task--list">
				{doneList.length > 0 &&
					doneList.map((task) => {
						return <DoneTask task={task} key={task.id} />;
					})}
			</div>
		</div>
	);
};

export default Home;

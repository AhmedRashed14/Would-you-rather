import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import UserStats from './UserStats';

function LeaderBoard() {

	const users = useSelector (state => state.users)

	const sortedUserIDs = Object.keys(users).sort((idA, idB) => {
		const scoreA =
			Object.keys(users[idA].answers).length + users[idA].questions.length;
		const scoreB =
			Object.keys(users[idB].answers).length + users[idB].questions.length;

		return scoreB - scoreA;
	})

	return (
		<Fragment>
		<h2 className="text-center my-3">
			<small>LeaderBoard</small>
		</h2>
		{sortedUserIDs.map((id) => (
			<UserStats key={id} id={id} />
		))}
		</Fragment>
	)
}

export default LeaderBoard;


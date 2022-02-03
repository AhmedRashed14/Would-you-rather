import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import UnansweredQuestion from './UnansweredQuestion';
import AnsweredQuestion from './AnsweredQuestion';

function QuestionPage (props) {

	const state = useSelector((state) => state)
	const {authedUser, users} = state
	const autherUserAnswers=users[authedUser].answers
	//const { autherUserAnsweres, match } = this.props;
	const id = props.match.params.id;
	const answered = autherUserAnswers.hasOwnProperty(id) ? true : false;

		return (
			<Fragment>
				<h2 className="text-center my-3">
					<small>Would You Rather...</small>
				</h2>
				{answered ? <AnsweredQuestion id={id} /> : <UnansweredQuestion id={id} />}
			</Fragment>
		);
}

export default QuestionPage;

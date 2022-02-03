import React from 'react';
import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { formatDate } from '../utils/helpers';
import PageNotFound from './PageNotFound';
import Avatar from './Avatar';

function AnsweredQuestion(props) {

		const question = useSelector(state => {
			return state.questions[props.id]? state.questions[props.id]:null
		});
		const authedUser = useSelector(state => state.authedUser);
		const author = useSelector(state => {
			return question ? state.users[question.author] : null
		})

		if (question === null) {
			return <PageNotFound />;
		}

		const { optionOne, optionTwo, timestamp } = question;
		const { name, avatarURL } = author;
		const totalVotes = optionOne.votes.length + optionTwo.votes.length;
		const optionOnePercent = Math.round((optionOne.votes.length / totalVotes) * 100);
		const optionTwoPercent = Math.round((optionTwo.votes.length / totalVotes) * 100);

		return (
			<Row className="justify-content-center">
				<Col xs={12} md={6}>
					<Card bg="light" className="m-3">
						<Card.Header>
							<Avatar avatarURL={avatarURL} className="mr-2" />
							{name} asks:
						</Card.Header>

						<Card.Body className="d-flex justify-content-center">
							<ul>
								<li>
									{optionOne.text}
									{optionOne.votes.includes(authedUser) ? (
										<span className="text-danger ml-2">
											&lt;- Your choice
										</span>
									) : null}
								</li>
								<ProgressBar
									now={optionOnePercent}
									label={`${optionOnePercent}%`}
									variant="info"
								/>
								<Card.Text className="text-muted">
									chosen by {optionOne.votes.length} out of {totalVotes}{' '}
									users
								</Card.Text>
								<li>
									{optionTwo.text}
									{optionTwo.votes.includes(authedUser) ? (
										<span className="text-danger ml-2">
											&lt;- Your choice
										</span>
									) : null}
								</li>
								<ProgressBar
									now={optionTwoPercent}
									label={`${optionTwoPercent}%`}
									variant="info"
								/>
								<Card.Text className="text-muted">
									chosen by {optionTwo.votes.length} out of {totalVotes}{' '}
									users
								</Card.Text>
							</ul>
						</Card.Body>
						<Card.Footer>
							<small className="text-muted">{formatDate(timestamp)}</small>
						</Card.Footer>
					</Card>
				</Col>
			</Row>
		);

}


export default AnsweredQuestion;

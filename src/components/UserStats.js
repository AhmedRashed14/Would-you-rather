import React from 'react';
import {useSelector} from 'react-redux';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Avatar from './Avatar';

function UserStats(props) {

		const users = useSelector((state) => state.users)
		const user =  users[props.id]
		const { name, avatarURL, answers, questions } = user;

		return (
			<Row className="justify-content-center">
				<Col xs={12} md={6}>
					<Card bg="light" className="m-3">
						<Card.Header>
							<Avatar avatarURL={avatarURL} className="mr-2" />
							{name}
						</Card.Header>
						<Card.Body className="d-flex justify-content-center">
							<Card.Text>
								Answered Questions: {Object.keys(answers).length}
								<br />
								Created Questions: {questions.length}
							</Card.Text>
						</Card.Body>
						<Card.Footer>
							Score: {Object.keys(answers).length + questions.length}
						</Card.Footer>
					</Card>
				</Col>
			</Row>
		);
}

export default UserStats;

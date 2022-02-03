import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { handleAddAnswer } from '../actions/questions';
import { formatDate } from '../utils/helpers';
import PageNotFound from './PageNotFound';
import Avatar from './Avatar';

class UnansweredQuestion extends Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.state = {
			errorMessage: ''
		};
	}

	handleSubmit = (id, e) => {
		const { dispatch } = this.props;

		const answer = this.form.answer.value;

		const text = 'You have to choose one';
		
		e.preventDefault();

		return answer!=='' ? dispatch(handleAddAnswer(id, answer)):
			this.setState({errorMessage:text})
	};

	render() {
		const { question, author } = this.props;

		if (question === null) {
			return <PageNotFound />;
		}

		const { errorMessage } = this.state;
		const { timestamp, optionOne, id, optionTwo } = question;
		const { avatarURL, name } = author;

		return (
			<Row className="justify-content-center">
				<Col xs={12} md={6}>
					<Card bg="light" className="m-3">
						<Card.Header>
							<Avatar avatarURL={avatarURL} className="mr-2" />
							{name} asks:
						</Card.Header>

						<Card.Body className="d-flex justify-content-center">
							<Form
								onSubmit={(e) => this.handleSubmit(id, e)}
								ref={(f) => (this.form = f)}
							>
								{errorMessage ? (
									<p className="text-danger">{errorMessage}</p>
								) : null}
								<Form.Check
									custom
									type="radio"
									id="optionOne"
									label={optionOne.text}
									value="optionOne"
									name="answer"
									className="mb-2"
								/>
								<Form.Check
									custom
									type="radio"
									id="optionTwo"
									label={optionTwo.text}
									value="optionTwo"
									name="answer"
									className="mb-2"
								/>
								<Button type="submit" variant="outline-dark">
									Vote
								</Button>
							</Form>
						</Card.Body>
						<Card.Footer>
							<small className="text-muted">{formatDate(timestamp)}</small>
						</Card.Footer>
					</Card>
				</Col>
			</Row>
		);
	}
}

function mapStateToProps({ questions, users }, { id }) {
	const question = questions[id];

	return {
		question: question ? question : null,
		author: question ? users[question.author] : null
	};
}

export default connect(mapStateToProps)(UnansweredQuestion);

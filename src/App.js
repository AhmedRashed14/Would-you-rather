import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import Login from './components/Login';
import PrivateApp from './components/PrivateApp';
import { handleInitialData } from './actions/shared';

function App() {
	const dispatch = useDispatch();
	useEffect(() =>{
		dispatch(handleInitialData())}
	,[dispatch])

		//const { authedUser, loadingBar } = props;
		const authedUser = useSelector(state=> state.authedUser)
		const loadingBar = useSelector(state=> state.loadingBar)

		 if (loadingBar.default=== undefined || loadingBar.default===1) {
			//loading
			return (
				<div className="d-flex justify-content-center">
					<Spinner
						animation="border"
						role="status"
						variant="secondary"
						className="my-5"
					>
						<span className="sr-only">Loading...</span>
					</Spinner>
				</div>
			);
		}
			return <Fragment>{!authedUser ? <Login /> : <PrivateApp />}</Fragment>;

}


export default App;

import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';

function Login(props) {

	const users = useSelector (state => state.users)
	const dispatch = useDispatch()

	const userNames = Object.keys(users).map((id) => ({
		value: id,
		label: users[id].name
	}))

	const [errorMessage,setErrorMessage] = useState('')
	const [userID ,setUserID] = useState('')

	const handleChange = (event) => {
		setUserID(event.target.value)
	}

	const handleSubmit = (event) => {
		const text = 'You must choose an username'
		console.log(userID);
		event.preventDefault();

		if(userID!=='') {dispatch(setAuthedUser(userID))}
		else {
			setErrorMessage(text)
			return (<p className="text-danger">{errorMessage}</p>)
		}
	}

	return (
		<div id='main-div'>
		<Fragment>
			<div id='error' >
				{errorMessage ? (
					<p className="text-danger">{errorMessage}</p>
				) : null}
			</div>
      <form className='form' onSubmit={handleSubmit}>
        <label>
          User Name:
          <select value={userID} onChange={handleChange}>
            <option value="">Select User</option>
						{userNames.map((item) => (
							<option value={item.value} key={item.value}>{item.label}</option>
						))}
          </select>
        </label>
        <input type="submit" value="Login" />
      </form>
		</Fragment>
	</div>
    );
}

export default Login;

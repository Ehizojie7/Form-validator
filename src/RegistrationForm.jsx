import React, { useState } from 'react';
import './form.css';
import { insert_user, INVALID_NAME, INVALID_DOB, INVALID_EMAIL, INVALID_PASSWORD, USER_ALREADY_REGISTERED } from './api.js';

function RegistrationForm() {
  const [userName, setUserName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const dobDate = new Date(dob);
    const insertResult = insert_user(userName, dobDate, email, password);
    if (!insertResult.result) {
      switch (insertResult.code) {
        case USER_ALREADY_REGISTERED:
          setErrorMessage('This user already exists.');
          break;
        case INVALID_NAME:
          setErrorMessage('Invalid name.');
          break;
        case INVALID_DOB:
          setErrorMessage('Invalid date of birth.');
          break;
        case INVALID_EMAIL:
          setErrorMessage('Invalid email.');
          break;
        case INVALID_PASSWORD:
          setErrorMessage('Invalid password.');
          break;
        default:
          setErrorMessage('An error occurred.');
          break;
      }
      setSuccessMessage('');
    } else {
      setErrorMessage('');
      setSuccessMessage('User successfully registered!');
      setEmail('');
      setDob('');
      setPassword('');
      setUserName('');
    }
  };

  return (
    <form className='registration' onSubmit={handleSubmit}>
      <div>
        <label htmlFor="userName">Name:</label>
        <input className='reg' type="text" id="userName" required value={userName} onChange={(event) => setUserName(event.target.value)} />
      </div>
      <div>
        <label htmlFor="dob">Date of birth:</label>
        <input className='reg' type="date" id="dob" value={dob}  required onChange={(event) => setDob(event.target.value)} />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input className='reg'type="email" id="email" value={email} required onChange={(event) => setEmail(event.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input className='reg' type="password" id="password" value={password} required onChange={(event) => setPassword(event.target.value)} />
      </div>
      {errorMessage ? <div className="error">{errorMessage}</div> : successMessage ? <div className='success'>{successMessage}</div> : null}
      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;

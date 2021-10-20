import React, { useState } from 'react';

import Modal from '../UI/Modal';
import Card from '../UI/Card';
import classes from './AddUser.module.css';
import Button from '../UI/Button';

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredAge, setEnteredAge] = useState('');
  const [error, setError] = useState();

  const userHandler = (event) => {
    event.preventDefault();

    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please, enter a valid name and age (no-empty)"
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "Invalid input",
        message: "Please, enter a valid age (> 0)"
      });
      return;
    }

    props.onAddUser(enteredUsername, enteredAge);
    setEnteredAge('');
    setEnteredUsername('');
  }

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  }

  return (
    <div>
      {error && <Modal title={error.title} message={error.message} onConfirm={errorHandler}></Modal>}
      <Card className={classes.input}>
        <form onSubmit={userHandler} >
          <label htmlFor="username">Username</label>
          <input 
            id="username" 
            type="text" 
            onChange={usernameChangeHandler}
            value={enteredUsername} />
          <label htmlFor="age">Age (Years)</label>
          <input 
            id="age" 
            type="number"  
            onChange={ageChangeHandler}
            value={enteredAge} />
          <Button type="submit">Add user</Button>
        </form>
      </Card>
    </div>

    
  )
};

export default AddUser;
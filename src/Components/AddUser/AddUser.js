import React, { useState, useRef } from 'react';

import Wrapper from '../Helpers/Wrapper';
import Modal from '../UI/Modal';
import Card from '../UI/Card';
import classes from './AddUser.module.css';
import Button from '../UI/Button';

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();

  const userHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;

    console.log(enteredName, enteredUserAge);

    if (enteredName.trim().length === 0 ||  enteredUserAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please, enter a valid name and age (no-empty)"
      });
      return;
    }
    if (+enteredUserAge < 1) {
      setError({
        title: "Invalid input",
        message: "Please, enter a valid age (> 0)"
      });
      return;
    }

    props.onAddUser(enteredName, enteredUserAge);
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
  }

  const errorHandler = () => {
    setError(null);
  }

  return (
    <Wrapper>
      {error && <Modal title={error.title} message={error.message} onConfirm={errorHandler}></Modal>}
      <Card className={classes.input}>
        <form onSubmit={userHandler} >
          <label htmlFor="username">Username</label>
          <input 
            id="username" 
            type="text" 
            ref={nameInputRef} />
          <label htmlFor="age">Age (Years)</label>
          <input 
            id="age" 
            type="number"
            ref={ageInputRef} />
          <Button type="submit">Add user</Button>
        </form>
      </Card>
    </Wrapper>
  )
};

export default AddUser;
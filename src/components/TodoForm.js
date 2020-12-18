import React, { memo, useState } from 'react';
import styles from './TodoForm.module.css';

const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const changeHandler = (event) => {
    setTitle(event.target.value);
  };

  const KeyPressHandler = (event) => {
    if (event.key === 'Enter') {
      onAdd(event.target.value);
      setTitle('');
    }
  };
  const clickHandler = () => {
    onAdd(title);
    setTitle('');
  };

  return (
    <div className={styles.wrapper}>
      <input
        onChange={changeHandler}
        value={title}
        onKeyPress={title ? KeyPressHandler : null}
        type="text"
        data-testid="title"
        placeholder="Введите задачу"
      />
      <button onClick={title ? clickHandler : null}>add</button>
    </div>
  );
};

export default memo(TodoForm);

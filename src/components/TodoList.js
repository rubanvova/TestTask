import React, { useState } from 'react';
import styles from './TodoList.module.css';
import close from '../close.svg';
import edit from '../edit.png';

export const sortTodos = (a, b) => {
  if (a.order > b.order) {
    return 1;
  } else {
    return -1;
  }
};

export const TodoList = ({
  todos,
  onRemove,
  onToggle,
  editTodo,
  showEditInput,
  setTodos,
}) => {
  const [TextEditTodo, setTextEditTodo] = useState('');
  const [currentCard, setCurrentCard] = useState(null);

  const keyPress = (event, id) => {
    if (event.key === 'Enter') {
      editTodo(TextEditTodo, id);
      showEditInput(id);
    }
  };

  const clickHadlerOk = (id) => {
    editTodo(TextEditTodo, id);
    showEditInput(id);
  };

  const removeHendler = (event, id) => {
    event.preventDefault();
    onRemove(id);
  };

  const dragStartHendler = (e, todo) => {
    setCurrentCard(todo);
  };

  const dragOverHendler = (e) => {
    e.preventDefault();
  };

  const dropHendler = (e, todo) => {
    e.preventDefault();
    setTodos(
      todos.map((t) => {
        if (t.id === todo.id) {
          return { ...t, order: currentCard.order };
        }
        if (t.id === currentCard.id) {
          return { ...t, order: todo.order };
        }
        return t;
      })
    );
  };

  if (todos.length === 0) {
    return <p>задач нет</p>;
  }

  return (
    <ul className={styles.ul}>
      {todos.sort(sortTodos).map((todo) => {
        let text = '';
        let color = '';
        if (todo.completed) {
          text = 'line-through';
          color = 'rgba(4, 231, 4, 0.322)';
        }
        return (
          <li
            draggable={true}
            onDragStart={(e) => dragStartHendler(e, todo)}
            onDragOver={(e) => dragOverHendler(e)}
            onDrop={(e) => dropHendler(e, todo)}
            className={styles.todo}
            key={todo.id}
            style={{ textDecoration: text, backgroundColor: color }}
          >
            <div className={styles.string}>
              <input
                type="checkbox"
                defaultChecked={todo.completed}
                onClick={() => onToggle(todo.id, todo.completed)}
              />
              <span className={styles.textTodo}>
                {todo.edit ? (
                  <input
                    className={styles.editInput}
                    defaultValue={todo.title}
                    onKeyPress={(event) => keyPress(event, todo.id)}
                    onChange={(event) => setTextEditTodo(event.target.value)}
                  />
                ) : (
                  todo.title
                )}
              </span>
            </div>
            <div className={styles.func}>
              {todo.edit ? (
                <div onClick={() => clickHadlerOk(todo.id)}>Ok</div>
              ) : null}

              <div onClick={() => showEditInput(todo.id)}>
                <img src={edit} alt="" height="19px" />
              </div>
              <div
                id="remove"
                onClick={(event) => removeHendler(event, todo.id)}
              >
                <img src={close} alt="" height="30px" />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

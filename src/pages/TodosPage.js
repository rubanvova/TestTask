import React, { useState, useEffect, useCallback } from 'react';
import TodoForm from '../components/TodoForm';
import { TodoList } from '../components/TodoList';

export const TodosPage = () => {
  const [todos, setTodos] = useState([]);
  const [ShowEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('todos') || '[]');
    setTodos(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addHandler = useCallback(
    (title) => {
      const or = todos.length;
      const newTodo = {
        title: title,
        id: Date.now(),
        completed: false,
        edit: false,
        order: or,
      };
      setTodos((prev) => [newTodo, ...prev]);
    },
    [setTodos, todos.length]
  );

  const editTodo = useCallback(
    (text, id) => {
      setTodos((prev) =>
        prev.map((todo) => {
          if (todo.id === id) {
            todo.title = text;
          }
          return todo;
        })
      );
    },
    [setTodos]
  );

  const showEditInput = (id) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          setShowEdit(!ShowEdit);
          todo.edit = !ShowEdit;
        }
        return todo;
      })
    );
  };

  const toggleHandler = useCallback(
    (id, completed) => {
      setTodos((prev) =>
        prev.map((todo) => {
          if (todo.id === id) {
            todo.completed = !completed;
          }
          return todo;
        })
      );
    },
    [setTodos]
  );

  const removeHandler = useCallback(
    (id) => {
      // eslint-disable-next-line no-restricted-globals
      let chek = confirm('Вы уерены?');
      if (chek) {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
      }
    },
    [setTodos]
  );

  return (
    <>
      <div id="task">Кол-во задач:{todos.length}</div>
      <TodoForm onAdd={addHandler} />
      <TodoList
        setTodos={setTodos}
        showEditInput={showEditInput}
        editTodo={editTodo}
        todos={todos}
        onToggle={toggleHandler}
        onRemove={removeHandler}
      />
    </>
  );
};

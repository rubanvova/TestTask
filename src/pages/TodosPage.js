import React, { useState, useEffect } from 'react';
import { TodoForm } from '../components/TodoForm';
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

  const addHandler = (title) => {
    const or = todos.length;
    const newTodo = {
      title: title,
      id: Date.now(),
      completed: false,
      edit: ShowEdit,
      order: or,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const editTodo = (text, id) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          todo.title = text;
        }
        return todo;
      })
    );
  };

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

  const toggleHandler = (id, completed) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          todo.completed = !completed;
        }
        return todo;
      })
    );
  };

  const removeHandler = (id) => {
    // eslint-disable-next-line no-restricted-globals
    let chek = confirm('Вы уерены?');
    if (chek) {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

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

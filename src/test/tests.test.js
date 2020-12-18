import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { sortTodos } from '../components/TodoList';
import { TodoForm } from '../components/TodoForm';

describe('TodoList', () => {
  test('sort', () => {
    expect(sortTodos(10, 15)).toBe(-1);
  });
});

describe('TodoForm', () => {
  test('input', () => {
    const { queryByTestId } = render(<TodoForm />);
    const input = queryByTestId('title');
    fireEvent.change(input, { target: { value: 'testString' } });
    expect(input.value).toBe('testString');
  });
});

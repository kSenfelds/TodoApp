import { TodoItem } from './TodoItem';
import { Button } from './Button';
import { TodoForm } from './TodoForm';
import React, { useState } from 'react';


export type Todo = {
    title: string;
    id: string;
    isDone: boolean;
  };

  export function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
  return (

    <div className = "container">
      <h1>Todo App</h1>

      {<TodoForm 
      onFormSubmit={(e) => {
          const newTodo: Todo ={
          id: Math.random().toString(),
          title: e,
          isDone: false
        };
        setTodos([...todos, newTodo])          
      }}  
    ></TodoForm>}

      <>
        {todos.map((todo) => {
          return (
           <TodoItem 
           todo={todo} 
           key={todo.id} 
           onCheckboxChange={() => {
            const newTodos = todos.map((todoItem)=> {
              if (todoItem.id === todo.id){
                return {
                  ...todoItem,
                  isDone: !todoItem.isDone,
                };
              }

              return todoItem;
            });

            setTodos(newTodos);
           }}

           onDeleteClick={() => {
            const filteredTodos = todos.filter(todoItem => todoItem.id != todo.id);
            setTodos(filteredTodos); 
           }}

           onEditSave={(newTitle) => {
            const newTodos = todos.map((todoItem)=> {
              if (todoItem.id === todo.id){
                return {
                  ...todoItem,
                  title: newTitle,
                };
              }

              return todoItem;
            });

            setTodos(newTodos);
           }}/>
           
          )
          
        })}
      </>
    </div>
  );
    }
import React, { useEffect, useRef, useState } from "react";
import { Todo } from "./TodoList";
import { Button } from "./Button";
import "../Styles/Components/todo-form.scss";


type FormProps = {
    onFormSubmit: (title: string) => void;
    
    initialValues?: Todo;    
  };

  

export const TodoForm = ({ onFormSubmit, initialValues}:FormProps) => {
    const [title, setTitle] = useState(initialValues?.title || "");
    const input = useRef<HTMLInputElement | null>(null);

    useEffect(()=>{
      input.current && input.current.focus();
    }, []);

    
    return (
    <form
        className="todo-form"
        onSubmit={(e) => {
        e.preventDefault();
        const newTitle = title;
        setTitle("");
        onFormSubmit(newTitle);
    }}>
      <label htmlFor="article-title">Add a thing todo:</label>
      <input
      ref = {input} 
      id= "article-title"
      type="text"
      value={title}
      placeholder="Todo"
      onChange={(event)=>{
            setTitle(event.target.value)
        }}/>

        <Button type = "submit">Save</Button>
      </form>);
}
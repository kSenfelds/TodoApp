import { Button } from "./Button";
import { Todo } from "../Components/TodoList";
import { useState } from "react";
import "../Styles/Components/Item.scss";

type TodoItemProps ={
   todo: Todo;
   onCheckboxChange: () => void;
   onDeleteClick: () => void;
   onEditSave: (newTitle: string) => void;
}

export const TodoItem = ({todo, onCheckboxChange, onDeleteClick, onEditSave}: TodoItemProps) =>
{
    const [isEdit, setIsEdit] = useState(false);
    const [newInputValue, setNewInputValue]= useState(todo.title)
    return (
        <li className="item">
           <div className="item-container"> {isEdit? (<form
            onSubmit={(e)=>{
                e.preventDefault();
                onEditSave(newInputValue);
                setIsEdit(false);
            }}>
           <input
            type="text"
            value= {newInputValue}
            onChange={(event) => {
            setNewInputValue(event.target.value);
            }}/>
            <Button type="submit">Save</Button>
            </form>) : (
            <h1 className="item-title">{todo.title}</h1>
            
            )}
            <input className="checkbox" type="checkbox"
            checked={todo.isDone} 
            onChange={() => {
                onCheckboxChange()     
            }}/></div>
            
            <div>
           <Button onButtonClick={() => {onDeleteClick()}}>Delete</Button>
           <Button variant={isEdit? "secondary" : "primary"} onButtonClick={() => {
            setIsEdit(!isEdit);

            if(isEdit){
                setNewInputValue(todo.title);
            }
           }}>{isEdit? "Cancel" : "Edit"}</Button>
           </div>
        </li>
    )
}
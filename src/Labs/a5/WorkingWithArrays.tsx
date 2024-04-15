import React, { useState, useEffect } from "react";
import axios from "axios";
function WorkingWithArrays() {

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const API = "http://localhost:4000/a5/todos";
    const [todo, setTodo] = useState({id: 1,
      title: "Assignment",
      description: "Create a NodeJS server with ExpressJS",
      due: "2021-09-09",
      completed: false,});
      const [todos, setTodos] = useState<{id: number, title: string, completed?: boolean, description?: string, due?: string}[]>([]);
      const postTodo = async () => {
        const response = await axios.post(API, todo);
        setTodos([...todos, response.data]);
      };
    

    const fetchTodos = async () => {
      const response = await axios.get(API);
      setTodos(response.data);
    };
    useEffect(() => {
      fetchTodos();
    }, []);
    const removeTodo = async (todo: { id: number }) => {
      const response = await axios.get(`${API}/${todo.id}/delete`);
      setTodos(response.data);
    };
    const createTodo = async () => {
      const response = await axios.get(`${API}/create`);
      setTodos(response.data);
    };
    const fetchTodoById = async (todo: { id: number}) => {
      const response = await axios.get(`${API}/${todo.id}`);
      setTodo(response.data);
    };

    const updateTitle = async () => {
    const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
    setTodos(response.data);
      };

  
      const deleteTodo = async (tod: { id: number }) => {
        try {
          const response = await axios.delete(`${API}/${tod.id}`);
          setTodos(todos.filter((t) => t.id !== tod.id));
        } catch (error: unknown) { // TypeScript 4.0+ syntax for catch clauses
          if (axios.isAxiosError(error)) { // Check if the error is an Axios error
            // Now TypeScript knows error is an AxiosError, so you can access error.response safely
            setErrorMessage(error.response?.data.message || "An unknown error occurred");
          } else {
            console.log("An unexpected error occurred:", error);
            // Handle non-Axios errors here
            setErrorMessage("An unknown error occurred");
          }
        }
      };

      const updateTodo = async () => {
        try {
          const response = await axios.put(`${API}/${todo.id}`, todo);
          setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
        } catch (error: unknown) { // Catching error as unknown type
          if (axios.isAxiosError(error)) { // Type guard for AxiosError
            setErrorMessage(error.response?.data.message || "An unknown error occurred");
          } else {
            // Handle the case where the error is not an AxiosError
            console.log("An unexpected error occurred:", error);
            setErrorMessage("An unknown error occurred");
          }
        }
      };


    

    
    return (
      <div>
        <h3>Working with Arrays</h3>
        <h4>Retrieving Arrays</h4>
        <a href={API}>
          Get Todos
        </a>

        <textarea value={todo.description} 
        onChange={(e) => setTodo({ ...todo,
          description: e.target.value })} />
      <input value={todo.due} type="date"
        onChange={(e) => setTodo({
          ...todo, due: e.target.value })} />
      <label>
        <input checked={todo.completed} type="checkbox"
          onChange={(e) => setTodo({
            ...todo, completed: e.target.checked })} />
        Completed
      </label>
      <button onClick={postTodo}> Post Todo </button>
      <button onClick={updateTodo}>
        Update Todo
      </button>
      {errorMessage && (
        <div className="alert alert-danger mb-2 mt-2">
          {errorMessage}
        </div>
      )}
        <h4>Retrieving an Item from an Array by ID</h4>
      <input value={todo.id}
        onChange={(e) => setTodo({ ...todo,
          id: parseInt(e.target.value) })}/>
          <input type="text" value={todo.title}
        onChange={(e) => setTodo({
          ...todo, title: e.target.value })}/>
          
      <h3>Updating an Item in an Array</h3>
      <a href={`${API}/${todo.id}/title/${todo.title}`} >
        Update Title to {todo.title}
      </a>
      <a href={`${API}/${todo.id}`}>
        Get Todo by ID
      </a>
      <h3>Filtering Array Items</h3>
        <a href={`${API}?completed=true`}>
          Get Completed Todos
        </a>
      <h3>Creating new Items in an Array</h3>
        <a href={`${API}/create`}>
          Create Todo
        </a>
      <h3>Deleting from an Array</h3>
      <a href={`${API}/${todo.id}/delete`}>
        Delete Todo with ID = {todo.id}
      </a>
      <a href={`${API}/${todo.id}/completed/${todo.completed}`} >
        Update Completed to {todo.completed}
      </a>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input checked={todo.completed}
              type="checkbox" readOnly />
            {todo.title}
            <p>{todo.description}</p>
            <p>{todo.due}</p>
            
            <button onClick={() => fetchTodoById(todo)} >
          Edit
        </button>
            <button onClick={() => removeTodo(todo)} >
          Remove
        </button>
            {todo.title}
          </li>
          
        ))}
      </ul>
      <button onClick={createTodo} >
        Create Todo
      </button>
      <button onClick={updateTitle} >
        Update Title
      </button>
      <button onClick={() => deleteTodo(todo)}
        className="btn btn-danger float-end ms-2">
        Delete
        </button>
      </div>
      
    );
    
  }
  export default WorkingWithArrays;
import React, { Component, useState } from "react";
import "./App.css";
// ======================
// 1. FUNCTIONAL COMPONENT (Uses: Components, Props, JSX, Event Handlers)
// ======================
const TaskList = ({ tasks, onToggleTask, onDeleteTask }) => {  // Added `onDeleteTask` prop
  return (
    <ul>
      {tasks.map((task) => (
        <li
          key={task.id}  // Virtual DOM: Unique key for efficient updates
          style={{ textDecoration: task.completed ? "line-through" : "none" }}
        >
          {/* JSX: Display task text */}
          <span onClick={() => onToggleTask(task.id)}>{task.text}</span>  
          
          {/* Event Handler: Delete button */}
          <button 
            className="delete-btn"  // Add this class
            onClick={() => onDeleteTask(task.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

// ======================
// 2. CLASS COMPONENT (Uses: Components, State, Lifecycle, JSX, Event Handlers)
// ======================
class TaskAdder extends Component {
  state = { inputText: "" };  // State: Tracks input field

  // Event Handler: Updates state on input change
  handleChange = (e) => {
    this.setState({ inputText: e.target.value });
  };

  // Event Handler: Submits new task
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.inputText.trim()) {
      this.props.onAddTask(this.state.inputText);
      this.setState({ inputText: "" });  // State: Reset input
    }
  };

  // Lifecycle: Mandatory render() method
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.inputText}  // State: Bound to input
          onChange={this.handleChange}  // Event Handler
          placeholder="Add a new task"
        />
        <button type="submit">Add Task</button>
      </form>
    );
  }
}

// ======================
// 3. MAIN APP (Uses: State, Components, Fragment, JSX, Event Handlers)
// ======================
const App = () => {
  // State: Manages tasks array
  const [tasks, setTasks] = useState([
    { id: 1, text: "Finish Week 1", completed: false },
    { id: 2, text: "Go to the Gym", completed: false },
  ]);

  // Event Handler: Adds new task
  const onAddTask = (text) => {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);  // State: Immutable update
  };

  // Event Handler: Toggles task completion
  const onToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // NEW: Event Handler: Deletes a task
  const onDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));  // State: Filter out task
  };

  return (
     <div className="task-container">
      <p className="full-text">
        This task form uses DOM Manipulation, state changes, use of Props, functional and class components, use of event handler to delete tasks and some core reat concepts with little css.
      </p>
      <h1>Task List</h1>
      <TaskAdder onAddTask={onAddTask} />
      
      {/* Wrapper div for task list with CSS class */}
      <div className="task-list">
        <TaskList 
          tasks={tasks} 
          onToggleTask={onToggleTask} 
          onDeleteTask={onDeleteTask} 
        />
      </div>
    </div>
  );
};

export default App;
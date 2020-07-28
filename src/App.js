import React from "react";
import styled from "styled-components";
import TodoItem from "./components/TodoItem";
import firebase from './components/Firestore'

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1`
  width: 500px;
  margin-top: 50px;
  text-align: center;
`;

const InputRow = styled.div`
  margin: 20px;
  flex-direction: row;
`;

const TextInput = styled.input``;

const AddButton = styled.button`
  margin-left: 50px;
`;

function App() {

  const retrieveTasks = () => {
    if (localStorage.getItem('tasks')) {
      const value = localStorage.getItem('tasks');
      return JSON.parse(value);
    }
    return []
  }

  const [taskTitle, setTaskTitle] = React.useState('');
  const [tasks, setTasks] = React.useState( retrieveTasks() );

  localStorage.setItem('tasks', JSON.stringify(tasks))

  const addTask = () => {
    if (taskTitle.trim().length) {
      const updated = tasks.concat([{
        title: taskTitle,
        isChecked: false,
        isEditable: false
      }]);
      setTasks(updated);
      setTaskTitle('');
    }
  };

  const onTextChange = (event) => {
    setTaskTitle(event.target.value);
  };

  const onDelete = (index) => {
    const tasksArray = [...tasks];
    tasksArray.splice(index, 1);
    setTasks(tasksArray);
  };

  const onCheck = (index, isChecked) => {
    const tasksArray = [...tasks];
    tasksArray[index].isChecked = isChecked;
    setTasks(tasksArray);
  };

  const onTitleDoubleClick = (index, isEditable) => {
    const tasksArray = [...tasks];
    tasksArray.forEach(task => task.isEditable = false);
    tasksArray[index].isEditable = isEditable;
    setTasks(tasksArray);
  }

  const updateTitle = (index, newTitle) => {
    const tasksArray = [...tasks];
    tasksArray[index].title = newTitle;
    setTasks(tasksArray);
  }

  return (
    <MainContainer>
      <Header>Todo List</Header>
      <InputRow>
        <TextInput
          value={taskTitle}
          onChange={onTextChange}
          onKeyDown={(event) => {
              if (event.keyCode === 13) {
                addTask()
              }
            }
          }
        />
        <AddButton onClick={addTask}>Add new task</AddButton>
      </InputRow>
      {
        tasks.map((task, index) => {
            return <TodoItem
              title={task.title}
              index={index}
              key={index}
              onDelete={onDelete}
              onCheck={onCheck}
              onTitleDoubleClick={onTitleDoubleClick}
              updateTitle={updateTitle}
              isChecked={task.isChecked}
              isEditable={task.isEditable}/>
          }
        )
      }
    </MainContainer>
  );
}

export default App;
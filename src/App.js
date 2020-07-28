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

  const db = firebase.firestore();
  const collection = db.collection("tasks");

  const onCollectionUpdate = (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      const { title, isChecked } = doc.data();
      data.push({
        id: doc.id,
        doc, // DocumentSnapshot
        title,
        isChecked,
      });
    });
    setTasks(data);
  };

  collection.onSnapshot(onCollectionUpdate)

  const [newTaskTitle, setNewTaskTitle] = React.useState('');
  const [tasks, setTasks] = React.useState([]);

  const addTask = () => {
    if (newTaskTitle.trim().length) {
      collection.add({
        title: newTaskTitle,
        isChecked: false
      });
      setNewTaskTitle('');
    }
  };

  const onTextChange = (event) => {
    setNewTaskTitle(event.target.value);
  };

  const onDelete = (id) => {
    collection.doc(id).delete()
  };

  const onCheck = (id, isChecked) => {
    const docRef = collection.doc(id);
    docRef.update({ isChecked: isChecked })
  };

  const updateTitle = (id, newTitle) => {
    const docRef = collection.doc(id);
    docRef.update({ title: newTitle })
  }

  return (
    <MainContainer>
      <Header>Todo List</Header>
      <InputRow>
        <TextInput
          value={newTaskTitle}
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
              id={task.id}
              key={task.id}
              onDelete={onDelete}
              onCheck={onCheck}
              updateTitle={updateTitle}
              isChecked={task.isChecked}
              />
          }
        )
      }
    </MainContainer>
  );
}

export default App;
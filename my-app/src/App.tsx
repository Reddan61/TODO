import React from 'react';
import css from "./App.module.css";
import Folders from "./components/folders/Folders";
import Tasks from "./components/tasks/Tasks";

function App() {
  return (
    <div className={css.container}>
      <Folders />
      <Tasks />
    </div>
  );
}

export default App;

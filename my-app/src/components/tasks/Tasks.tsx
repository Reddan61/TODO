import React from "react";
import css from "./Tasks.module.css";
import TaskItem from "../taskItems/taskItem";

const Tasks = () => {
    return <div className = {css.tasks}>
        <TaskItem />
        <TaskItem />
    </div>
};


export default Tasks;
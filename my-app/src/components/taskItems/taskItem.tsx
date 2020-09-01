import React, {useState} from "react";
import css from "./taskItem.module.css"

const TaskItem:React.FC<otherPropsType> = (props) => {
    let [isOpen, ChangeOpen] = useState(false);
    debugger
    return <div className={css.container}>
        <div className={css.container__topic}>
            <span>{props.task.title}</span>
        </div>
        <div className={css.container__text}>
            <span className={`${css.text__area} ${isOpen?css.text__area_active:''}`}>
                {props.task.text}
            </span>
            <div className={`${css.container__more} ${isOpen?css.container__more_active:''}` } onClick={() => {
                ChangeOpen(!isOpen)
            }}>
            </div>
        </div>

    </div>
};


type otherPropsType = {
    task: {
        title:string,
        text:string
    }
}

export default TaskItem;